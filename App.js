
import usePushNotifications from './Hooks/Notifications/usePushNotifications';
import NavigationBar from './components/Navigation/NavigationBar'
export default function App() {

  const { expoPushToken, notification } = usePushNotifications()

  const data = JSON.stringify(notification, undefined, 2)

  const tok = expoPushToken?.data ?? "";

  console.log(tok);
  return (
    <>
      <NavigationBar />

    </>

  );
}


