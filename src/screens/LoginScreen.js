import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/authApi';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await loginUser(email, password);
            await AsyncStorage.setItem('token', data.token);
            Alert.alert('Giriş Başarılı');
            navigation.replace('PanelNav');
        } catch (error) {
            Alert.alert('Hata', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.header}>
                        <Image source={require('../assets/AltPayHeader.png')} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.headerText}>AltPay</Text>
                    </View>

                    <View style={styles.center}>
                        <Image source={require('../assets/pp.png')} style={styles.pplogo} resizeMode="contain" />
                        <Text style={styles.title}>AltPay'e Hoşgeldiniz!</Text>

                        <TextInput
                            placeholder="E-Mail"
                            placeholderTextColor="gray"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder="Şifre"
                            placeholderTextColor="gray"
                            secureTextEntry
                            style={styles.input}
                            value={password}
                            keyboardType="numeric"
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Giriş</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    scroll: {
        alignItems: 'center',
        paddingVertical: hp('5%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: wp('3%'),
        marginBottom: hp('3%'),
    },
    logo: {
        width: wp('15%'),
        height: wp('15%'),
    },
    headerText: {
        fontSize: wp('10%'),
        color: '#0F5A2D',
        fontWeight: '900',
        fontStyle: 'italic',
    },
    center: {
        alignItems: 'center',
        width: wp('90%'),
    },
    pplogo: {
        width: wp('40%'),
        height: hp('20%'),
        marginBottom: hp('2%'),
    },
    title: {
        fontSize: wp('8%'),
        color: '#0F5A2D',
        fontWeight: '600',
        marginBottom: hp('4%'),
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: hp('7%'),
        borderColor: '#0F5A2D',
        borderWidth: 4,
        borderRadius: 20,
        paddingHorizontal: wp('5%'),
        marginBottom: hp('2.5%'),
        fontSize: wp('4%'),
        color: 'black',
    },
    button: {
        backgroundColor: '#0F5A2D',
        width: '80%',
        height: hp('7.5%'),
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    buttonText: {
        color: '#FFF',
        fontSize: wp('7%'),
        fontWeight: '600',
    },
});

export default LoginScreen;
