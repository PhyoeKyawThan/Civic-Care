import { AuthProvider } from "@/context/auth-context";
import * as Notifications from 'expo-notifications';
import { SplashScreen } from "expo-router";
import * as TaskManager from 'expo-task-manager';
import AppLayout from "./app_layout";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,

  }),
});
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data, error, executionInfo }) => {
    console.log("✅ Received a notification in the background!", {
      data,
      error,
      executionInfo,
    });
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* <NotificationProvider> */}
        <AppLayout />
      {/* </NotificationProvider> */}
    </AuthProvider>
  );
}
