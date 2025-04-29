import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Header({ title, onMenuPress, onAvatarPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onMenuPress}>
                <Image
                    source={require('../assets/menu.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity onPress={onAvatarPress}>
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
        width: 420,
        height: 92,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#599270A8',

    },
    icon: {
        marginTop:30,
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 20,
        marginTop:30,
        fontWeight: 'bold',
    },
    avatar: {
        marginTop:30,
        width: 40,
        height: 40,

    },
});
