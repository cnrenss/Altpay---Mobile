import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function AuthNav(){

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AuthNav;
