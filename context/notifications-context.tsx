import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: any;
  socketCount: number;
  clearNotification: (notification_id?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<any>(null);
  const [socketCount, setSocketCount] = useState(0);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Try Push Registration (FCM)
    registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token ?? null),
      (err) => {
        console.warn("Push Reg Failed (Likely No GMS):", err);
        setError(err);
      }
    );

    // Initialize Socket.io (The Fallback/Live Channel)
    socketRef.current = io("http://192.168.100.53:8000", {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketRef.current.on("notification_update", async (data) => {
      setSocketCount(data.count);

      await Notifications.setBadgeCountAsync(data.count);
      if (data.count > 0) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "New Update",
            body: `You have ${data.count} new notifications.`,
            badge: data.count,
          },
          trigger: null, // trigger immediately
        });
      }
    });

    // Listen for incoming notifications (from any source)
    const nListener = Notifications.addNotificationReceivedListener(setNotification);

    return () => {
      socketRef.current?.disconnect();
      nListener.remove();
    };
  }, []);
  const clearNotification = async (notification_id?: string) => {
    await Notifications.dismissAllNotificationsAsync();
    if (socketRef.current?.connected) {
      socketRef.current.emit("mark_notifications_as_read", { userId: "current-user-id", notification_id: "123" });
    }
  };
  return (
    <NotificationContext.Provider value={{ expoPushToken, notification, error, socketCount, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};