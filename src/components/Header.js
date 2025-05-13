import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Header({ title, onMenuPress, onAvatarPress }) {
    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image source={require('../assets/menu.png')} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image
                    source={require('../assets/avatar.png')}
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#599270A8',

    },
    icon: {
        marginTop:15,
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 20,
        marginTop:15,
        fontWeight: 'bold',
    },
    avatar: {
        marginTop:15,
        width: 40,
        height: 40,

    },
});
