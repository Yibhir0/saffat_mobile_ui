import { React } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CardPrayer from '../card/CardPrayer'

const Prayers = ({ prayers }) => {

    return (
        <SafeAreaView >
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                numColumns={2}
                data={prayers}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => (
                    <CardPrayer item={item} />
                )}
            />
        </  SafeAreaView>
    )
}

export default Prayers