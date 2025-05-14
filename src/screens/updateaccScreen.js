import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PasswordUpdateScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bu bir hesap ayarları sayfasıdır</Text>
        </View>
    );
};

export default PasswordUpdateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // dikey ortalama
        alignItems: 'center',     // yatay ortalama
        backgroundColor: '#f2f2f2',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
