import * as React from 'react';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {Subscription} from 'expo-notifications';
import {useSettingsStore} from "../store/settingsStore";
import {auth, firestore} from "../firebase/firebase";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


export function NotificationService() {
    const [notification, setNotification] = useState<any>(null);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notificationListener, setNotificationListener] = useState<Subscription>(null);
    const [responseListener, setResponseListener] = useState<Subscription>(null);

    const setToken = useSettingsStore().setToken

    useEffect(() => {
        try {
            registerForPushNotificationsAsync().then(token => {
                setExpoPushToken(token)
                console.log("SETTING TOKEN.... ", auth, " ", firestore)
                if (auth != null && firestore != null) {
                    setToken(token, auth, firestore)
                }
            });

            setNotificationListener(Notifications.addNotificationReceivedListener(
                notification => {
                    console.log(notification)
                    setNotification(notification);
                }))

            setResponseListener(Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            }))
        } catch (e) {
            console.log(e)
        }

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, [auth.currentUser]);

    return <></>
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {

        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync({projectId: '7b7b7e03-9459-4a44-bdc8-a709d90c3b03'})).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
