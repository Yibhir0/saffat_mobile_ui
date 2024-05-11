import { React, useEffect, useState } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Prayers from '../components/list/prayers';
import { Image, Text } from 'react-native';
import CardPrayer from '../components/card/CardPrayer';

function Home() {

    const d = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now());

    const formattedDay = new Intl.DateTimeFormat('en-US', {
        weekday: 'long'
    }).format(Date.now());

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const [nextPrayer, setNextPrayer] = useState({});

    const getPrayers = async () => {
        try {
            const response = await fetch(apiUrl);
            const json = await response.json();
            const last = await json.pop();
            setData(json);
            setNextPrayer(last);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPrayers();

    }, []);
    return (
        <View style={styles.appContainer} >

            {isLoading ? (
                <ActivityIndicator />
            ) : (

                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Image
                            style={{ width: 60, height: 60, borderRadius: 10 }}
                            source={require('../assets/msa.png')}
                        />
                        <Text style={{ color: "gray", fontWeight: 'bold' }}>{d}</Text>
                        <Text style={{ color: "gray", fontWeight: 'bold', fontStyle: 'italic' }} >{formattedDay}</Text>

                    </View>

                    <Prayers prayers={data} />

                    <CardPrayer item={nextPrayer} color={"green"} />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        backgroundColor: '#EEF3F3',

    },

});

export default Home