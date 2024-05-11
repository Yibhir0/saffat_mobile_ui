import { StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';

const CardPrayer = ({ item, color }) => {
    return (

        <Card containerStyle={!color ? styles.card : styles.uCard}>
            <Card.Title>{item.name}: {item.ar_name}</Card.Title>
            <Card.Divider />
            <Text style={styles.item}> <Text style={styles.text}>Adan: </Text>{item.adan} <Text style={styles.text}>: أذان</Text></Text>
            <Text style={styles.item}> <Text style={styles.text}>Iqama: </Text>{item.iqama} <Text Text style={styles.text}>: الإقامة</Text> </Text>
        </Card>
    )
}
const styles = StyleSheet.create({
    item: {
        fontSize: 12,
        color: '#D35400',
        textAlign: 'center',
        fontWeight: '800',
        padding: 4,
        fontStyle: 'italic'
    },
    card: {
        borderRadius: 10,
    },
    uCard: {
        backgroundColor: "#C4D2D0",
        borderRadius: 10,
    },
    text: {
        fontWeight: '600',
        color: 'gray',
    }
});

export default CardPrayer;
