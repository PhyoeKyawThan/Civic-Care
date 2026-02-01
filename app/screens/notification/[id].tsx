import { notificationSamples } from '@/assets/samples/noti_samples';
import { Colors } from '@/constants/theme';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotificationDetail() {
    const { id, title, body } = useLocalSearchParams<{
        id: string;
        title?: string;
        body?: string;
    }>();
    const notification = notificationSamples.filter((notification) => notification.id === id)[0];
    return (
        <>
            <Stack.Screen options={{
                title: title ?? 'Notification',
                headerStyle: {
                    backgroundColor: Colors.light.background
                }
            }} />
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <TouchableOpacity>
                        <Image style={styles.avatar} src={notification.user.avatar ?? 'https://dummyimage.com/100x100/000/ff6b6b.png&text=User+' + notification.user.id} />
                    </TouchableOpacity>
                    <View style={{
                        gap: 10
                    }}>
                        <Text style={{
                            fontWeight: "600",
                        }}>{notification.user.full_name}</Text>
                        <Text>{notification.created_at}</Text>
                    </View>
                </View>

                {/* contents */}
                <View style={styles.content}>
                    <Text style={{
                        fontWeight: "700",
                        fontSize: 19,
                        textAlign: 'justify'
                    }}>
                        <Text style={{
                            // fontWeight: "100"
                            fontSize: 18,
                        }}>English ဘာသာ Lorem ipsum စာများသည် </Text>
                    </Text>
                </View>
            </View></>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 10,
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 50
    },
    content: {
        flex: 1,
        padding: 20,
    }
});