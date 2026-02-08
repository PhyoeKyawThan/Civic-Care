import { useAuth } from "@/hooks/use-auth";
import { useServicesEntries } from "@/services/services_endpoints";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import { getToken } from "@/utils/test-token-storage";
import * as Notifications from "expo-notifications";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";

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
  const { notificationWS } = useServicesEntries();
  const { user } = useAuth();

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Try Push Registration (FCM)
    registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token ?? null),
      (err) => {
        console.warn("Push Reg Failed (Likely No GMS):", err);
        setError(err);
      }
    );

    const connectWebSocket = async () => {
      const accessToken = await getToken();
      const wsUrl = `${notificationWS}?token=${accessToken}`;
      socketRef.current = new WebSocket(wsUrl);

      socketRef.current.onopen = () => console.log("WS Connected ✅");

      socketRef.current.onmessage = async (e) => {
        const data = JSON.parse(e.data);
        if (data.count !== undefined) {
          setSocketCount(data.count);
          await Notifications.setBadgeCountAsync(data.count);
        }

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "New Update",
            body: data.notification || `You have new updates.`,
            sound: true,
            priority: 'high',
          },
          trigger: null,
        });
      };

      socketRef.current.onerror = (e) => console.error("WS Error:", e);

      socketRef.current.onclose = (e) => {
        console.log("WS Closed. Reconnecting in 3s...", e.reason);
        setTimeout(connectWebSocket, 10000);
      };
    };

    if (!!user) {
      connectWebSocket();
    }

    const nListener = Notifications.addNotificationReceivedListener(setNotification);

    return () => {
      socketRef.current?.close();
      nListener.remove();
    };
  }, []);
  const clearNotification = async (notification_id?: string) => {
    await Notifications.dismissAllNotificationsAsync();
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        "action": "mark_as_read",
        "notification_id": notification_id || "all"
      }));
    }
  };
  return (
    <NotificationContext.Provider value={{ expoPushToken, notification, error, socketCount, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};