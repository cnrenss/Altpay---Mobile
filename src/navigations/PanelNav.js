import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import LinkListScreen from '../screens/LinkListScreen';
import LinkCreateScreen from '../screens/LinkCreateScreen';
import SanalPosScreen from '../screens/SanalPosScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View} from 'react-native';

const Stack = createNativeStackNavigator();

function PanelStackNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LinkList"
        component={LinkListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LinkCreate"
        component={LinkCreateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SanalPos"
        component={SanalPosScreen}
        options={{headerShown: false}}
      />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{headerShown: false}}
            />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const {navigation} = props;

  return (
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PanelStackNav', { screen: 'Settings' })}>
              <View style={styles.menuItem}>
                  <Image source={require('../assets/Male.png')} style={styles.image} />
                  <Text style={styles.baslik}>Profil ve Ayarlar</Text>
              </View>
          </TouchableOpacity>

          <View style={styles.cizgi}> </View>


        <TouchableOpacity onPress={() => navigation.navigate('PanelStackNav', { screen: 'Home' })}>
            <View style={styles.menuItem}>
                <Image source={require('../assets/Home.png')} style={styles.image} />
                <Text style={styles.baslik}>Ana Sayfa</Text>
            </View>
         </TouchableOpacity>
          <View style={styles.cizgi}> </View>

          <TouchableOpacity onPress={() => navigation.navigate('PanelStackNav', { screen: 'LinkCreate' })}>
              <View style={styles.menuItem}>
                  <Image source={require('../assets/Plus.png')} style={styles.image} />
                  <Text style={styles.baslik}> Link Oluşturma</Text>
              </View>
          </TouchableOpacity>

          <View style={styles.cizgi}> </View>

      <TouchableOpacity onPress={() => navigation.navigate('PanelStackNav', { screen: 'LinkList' })}>
          <View style={styles.menuItem}>
              <Image source={require('../assets/whitelink.png')} style={styles.image} />
              <Text style={styles.baslik}> Link Listesi</Text>
          </View>
      </TouchableOpacity>
          <View style={styles.cizgi}> </View>

          <TouchableOpacity onPress={() => navigation.navigate('PanelStackNav', { screen: 'SanalPos' })}>
              <View style={styles.menuItem}>
                  <Image source={require('../assets/cardswhite.png')} style={styles.image} />
                  <Text style={styles.baslik}>Sanal Pos</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.cizgi}> </View>



      </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function PanelNav() {
  return (
    <Drawer.Navigator
        screenOptions={{
            drawerStyle: {
                backgroundColor: 'rgba(15, 90, 45, 0.7)',
                width: 250,
            },
            overlayColor: 'transparent',
        }}
      drawerContent={props => <CustomDrawerContent {...props} />} // 👈 burada tanımlanıyor
    >
      <Drawer.Screen
        name="PanelStackNav"
        component={PanelStackNav}
        options={{headerShown: false}}
      />

    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 129,

    },
    baslik:{
        color: 'white',
        fontWeight:'semibold',
        fontSize:20,
        marginLeft: 10,
    },
    cizgi:{
        marginTop:5,
        borderColor: 'white',
        borderWidth: 1,
    },
    image: {
        width: '30',
        height: '30',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }

});
