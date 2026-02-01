
export type NotiType = 'INFO' | 'WARNING' | 'SUCCESS' | 'SYSTEM';


interface NotificationUser{
    id: string,
    avatar?: string,
    email: string,
    username?: string,
    full_name: string
}

export type NotificationType = {
    id: string,
    user: NotificationUser,
    title: string,
    body: string,
    ref_url?: string,
    type: NotiType,
    is_read: boolean,
    created_at: string,
    read_at?: string,
    data?: string
};