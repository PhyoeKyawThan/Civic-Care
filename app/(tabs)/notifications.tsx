import { notificationSamples } from "@/assets/samples/noti_samples";
import { Header } from "@/components/header";
import NotificationItem from "@/components/notification";
import { ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


function Notification() {
  // const { clearNotification } = useNotification();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView>
      <Header headerTitle="Notifications" />
      <ScrollView>
        <View style={{
          flex: 1,
          paddingBottom: 120 + insets.bottom,
        }}>
          {notificationSamples.map((notification) => {
            return <NotificationItem key={notification.id} notification={notification} />
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Notification;