import { useState, useEffect } from 'react';


export default function useStoreNotifications(tok) {

    const notfUrl = `${process.env.EXPO_PUBLIC_NOTF_URL}/api/push_tokens/token`;

    console.log(notfUrl);

    const [tokenResponse, setTokenResponse] = useState(null);

    async function storePushToken(t) {

        let data;

        try {
            console.log("fetch");
            let res = await fetch(notfUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: t
                }),
            });
            data = await res.json();

            if (!res.ok) {
                throw Error(data.error);
            }


        } catch (error) {
            console.log('error in registerForPushNotificationsAsync');
            console.log(error.message);
        }
        finally {
            setTokenResponse(data);
        }
    }
    useEffect(() => {
        storePushToken(tok);
    }, [tok]);

    return {
        tokenResponse
    }
}
