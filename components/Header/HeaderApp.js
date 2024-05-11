import React from 'react'

import { TouchableOpacity, Image, Text } from 'react-native';
import { Header } from '@rneui/themed';


function HeaderApp() {


    const renderCustomIcon = () => {
        return (
            <TouchableOpacity onPress={() => { console.log('A Pressed!') }}>
                <Image
                    style={{ width: 45, height: 45, borderRadius: 10 }}
                    source={require('../../assets/msa.png')}
                />
            </TouchableOpacity>
        );
    };

    const renderCustomText = () => {
        return (
            <Text style={{
                fontSize: 20,
                color: 'gray',
                padding: 6,
            }}> MSA Concordia - مصلى </Text>
        );
    };
    return (
        <Header
            leftComponent={() => renderCustomIcon()}
            centerComponent={() => renderCustomText()}
            containerStyle={{
                backgroundColor: '#EEF3F3',
                marginTop: 50,

            }}
        />
    )
}

export default HeaderApp