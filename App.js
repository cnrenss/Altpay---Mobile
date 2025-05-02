import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNav from './src/navigations/AuthNav';
import PanelNav from './src/navigations/PanelNav';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthNav">
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PanelNav"
            component={PanelNav}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
