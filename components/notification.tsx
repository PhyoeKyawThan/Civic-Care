import { NotificationType } from "@/constants/notification";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface NotificationProps {
    notification: NotificationType
}
 
export default function NotificationItem({ notification }: NotificationProps) {
    const openNotification = (id: string) =>{
        router.push({
            pathname: '/screens/notification/[id]',
            params: {
                id: notification.id,
                title: notification.title
            }
        });
    }
    return (
        <TouchableOpacity onPress={()=>openNotification(notification.id)}>
            <View style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                borderRadius: 18,
                margin: 10,
                marginBottom: 5,
                backgroundColor: 'white'
            }}>
                <Image style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50
                }} src={notification.user.avatar ?? 'https://dummyimage.com/100x100/000/ff6b6b.png&text=User+' + notification.user.id} />
                <View style={{
                    flex: 1,
                    // backgroundColor: 'red',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Text style={{
                            fontWeight: "600",
                            color: "#1a3713"
                        }}>{notification.user.full_name}</Text>
                        <Text>{notification.created_at}</Text>
                    </View>
                    <Text style={{
                        fontWeight: "400",
                        color: "#1a3713"
                    }}>{notification.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}