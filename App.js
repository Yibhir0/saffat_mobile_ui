
import usePushNotifications from './Hooks/Notifications/usePushNotifications';
import useStoreNotifications from './Hooks/Notifications/useStoreNotifications';
import NavigationBar from './components/Navigation/NavigationBar'
export default function App() {

  const { expoPushToken, notification } = usePushNotifications()

  const tok = expoPushToken?.data ?? "";

  const { tokenResponse } = useStoreNotifications(tok)

  console.log(tokenResponse);
  return (
    <>
      <NavigationBar />
    </>

  );
}


