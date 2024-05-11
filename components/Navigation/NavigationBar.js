import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Home from '../../Screens/Home'
import About from '../../Screens/About'
import Contact from '../../Screens/Contact'

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
    return (
        <View style={styles.container}>

            <StatusBar style="auto" />
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="MSA Concordia - مصلى "
                        component={Home}

                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="mosque" size={size} color={color} />
                            )
                        }}
                    >

                    </Tab.Screen>
                    <Tab.Screen
                        name="About"
                        component={About}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="information-circle" size={size} color={color} />
                            )
                        }}
                    >

                    </Tab.Screen>
                    <Tab.Screen
                        name="Contact"
                        component={Contact}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="contact-page" size={size} color={color} />
                            )
                        }}
                    >

                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});