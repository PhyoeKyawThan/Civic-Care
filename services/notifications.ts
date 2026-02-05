import { NotificationType } from "@/types/notification";
import { useCallback, useState } from "react";
import { useServicesEntries } from "./services_endpoints";

const { notifications } = useServicesEntries();

export const useNotification = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const getHeaders = (token: string | null) => ({
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    });

    const fetchNotifications = useCallback(async (token: string | null) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${notifications}/?page=1`, {
                method: "GET",
                headers: getHeaders(token),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data: NotificationType[] = await response.json();
            setNotifications(data);
            
            const unread = data.filter(n => !n.is_read).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addIncomingNotification = useCallback((newNoti: NotificationType) => {
        setNotifications((prev) => [newNoti, ...prev]);
        setUnreadCount((prev) => prev + 1);
    }, []);

    const markAsRead = useCallback(async (id: string, token: string | null) => {
        try {
            const response = await fetch(`${notifications}/notifications/${id}/mark-as-read/`, {
                method: "POST",
                headers: getHeaders(token),
            });

            if (!response.ok) throw new Error("Failed to mark as read");

            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
                )
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    }, []);

    return {
        notifications,
        unreadCount,
        isLoading,
        fetchNotifications,
        addIncomingNotification,
        markAsRead
    };
};