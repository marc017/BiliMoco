import { useEffect } from 'react';
// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permission from 'expo-permissions';
import expoPushTokensApi from '../api/expoPushTokens';
import navigation from '../navigation/rootNavigation';
import { Platform } from 'react-native';

export default useNotifications = (notificationListener) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = Permission.askAsync(Permission.NOTIFICATIONS);
      // if (!(await permission).granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
    } catch (error) {
      console.error('Error getting a push token', error);
    }
  };
};
