import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import LinkListScreen from '../screens/LinkListScreen';
import LinkCreateScreen from '../screens/LinkCreateScreen';
import SanalPosScreen from '../screens/SanalPosScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import updatepassScreen from '../screens/updatepassScreen';
import updateaccScreen from '../screens/updateaccScreen';

const Stack = createNativeStackNavigator();

function PanelStackNav() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LinkList" component={LinkListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LinkCreate" component={LinkCreateScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SanalPos" component={SanalPosScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UpdatePass" component={updatepassScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateAcc" component={updateaccScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function CustomDrawerContent(props) {
    const { navigation } = props;

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'AuthNav' }],
            })
        );
    };

    const DrawerItem = ({ icon, label, screen }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PanelStackNav', { screen })}>
            <View style={styles.menuItem}>
                <Image source={icon} style={styles.icon} />
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
            <DrawerItem icon={require('../assets/Male.png')} label="Profil ve Ayarlar" screen="Settings" />
            <View style={styles.divider} />

            <DrawerItem icon={require('../assets/Home.png')} label="Ana Sayfa" screen="Home" />
            <View style={styles.divider} />

            <DrawerItem icon={require('../assets/Plus.png')} label="Link Oluşturma" screen="LinkCreate" />
            <View style={styles.divider} />

            <DrawerItem icon={require('../assets/whitelink.png')} label="Link Listesi" screen="LinkList" />
            <View style={styles.divider} />

            <DrawerItem icon={require('../assets/cardswhite.png')} label="Sanal Pos" screen="SanalPos" />
            <View style={styles.divider} />

            <TouchableOpacity onPress={handleLogout}>
                <View style={styles.logoutButton}>
                    <Image source={require('../assets/logout.png')} style={styles.icon} />
                    <Text style={styles.label}>Çıkış Yap</Text>
                </View>
            </TouchableOpacity>
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
                    width: wp('65%'),
                },
                overlayColor: 'transparent',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="PanelStackNav" component={PanelStackNav} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        paddingTop: hp('8%'),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
    },
    icon: {
        width: wp('7%'),
        height: wp('7%'),
        resizeMode: 'contain',
        marginRight: wp('3%'),
    },
    label: {
        fontSize: wp('4.5%'),
        color: '#FFF',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#FFF',
        marginVertical: hp('0.5%'),
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('5%'),
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#71281D',
        backgroundColor: '#71281D',
        borderRadius: 30,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('5%'),
    },
});
