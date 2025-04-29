import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function StartScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        const sayac = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(sayac);
    }, [fadeAnim, navigation]);

    return (
        <LinearGradient
            colors={['#FFFFFF', '#51A874', '#0F5A2D']}
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/AltPay_Logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                    AltPay
                </Animated.Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 102,
        height: 102,
        marginBottom: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: 'white',
        fontStyle: 'italic',
    },
});
