import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



export default function usePushNotifications() {

    const notfUrl = `${process.env.EXPO_PUBLIC_NOTF_URL}/api/push_tokens/token`;
    console.log(notfUrl);

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

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
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            token = await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas?.projectId, });

        } else {
            alert('Must use physical device for Push Notifications');
        }


        storePushToken(token).then(t => console.log(t));

        return token;
    }

    async function storePushToken(t) {

        try {
            console.log("fetch");
            let res = await fetch(notfUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    t
                }),
            });
            console.log(res);
            if (!res.ok) {
                let data = await res.json();
                throw Error(data.error);
            }
        } catch (error) {
            console.log('error in registerForPushNotificationsAsync');
            console.log(error.message);
        }
    }
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));


        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            // route to 
            console.log("response");
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return {
        expoPushToken,
        notification,
    }


}

// async function schedulePushNotification() {
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             title: "You've got mail! 📬",
//             body: 'Here is the notification body',
//             data: { data: 'goes here' },
//         },
//         trigger: { seconds: 5 },
//     });
// }




// return (
//     <View
//         style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'space-around',
//         }}>
//         <Text>Your expo push token: {expoPushToken}</Text>
//         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Title: {notification && notification.request.content.title} </Text>
//             <Text>Body: {notification && notification.request.content.body}</Text>
//             <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//         </View>
//         <Button
//             title="Press to schedule a notification"
//             onPress={async () => {
//                 await schedulePushNotification();
//             }}
//         />
//     </View>
// );