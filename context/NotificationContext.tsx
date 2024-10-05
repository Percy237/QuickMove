import { registerForPushNotificationsAsync } from "@/lib/notifications";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { ExpoPushToken } from "expo-notifications";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationContextProvider = ({ children }: PropsWithChildren) => {
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const [expoPushToken, setExpoPushToken] = useState<string>();
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
      }
      if (notificationListener.current) {
        responseListener.current &&
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
      }
    };
  }, []);
  console.log("Push Token: ", expoPushToken);
  console.log("Notif: ", notification);
  return <>{children}</>;
};

export default NotificationContextProvider;
