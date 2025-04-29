import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import BottomPanel from '../components/BottomPanel';


const LoginScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image
                    source={require('../assets/AltPayHeader.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.text}>AltPay</Text>
            </View>
            <View style={styles.container}>
                <Image
                    source={require('../assets/pp.png')}
                    style={styles.pplogo}
                    resizeMode="contain"
                />
                <Text style={styles.text2}>AltPay'e Hoşgeldiniz!</Text>

            </View>

            {/*BURAYA ŞART EKLENİCEK DOĞRU GİRİŞ YAPILMASI BEKLENİLECEK*/}

            <View style={{flex:1.9,alignItems: 'center'}}>
                <TextInput
                    placeholder="E-Mail"
                    placeholderTextColor="#D3D3D3"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Şifre"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Giriş</Text>
                </TouchableOpacity>
            </View>
            <BottomPanel style={styles.bottompanel} navigation={navigation} />
        </View>
    );
};


const styles = StyleSheet.create({
    bottompanel: {
        flex: 1,
        paddingBottom: 60,
    },
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    text: {
        fontSize: 40,
        color: '#0F5A2D',
        fontWeight: '900',
        fontStyle: 'italic',
    },
    text2:{
        fontSize: 32,
        color: '#0F5A2D',
        fontWeight: '600',

    },
    pplogo:{

        marginTop: 40,
        width: 164,
        height: 140,

    },
    input: {
        width: 300,
        height: 54,
        backgroundColor: '#0F5A2DAD',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        color: 'white',
        fontSize: 16,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#0F5A2D',
        width: 200,
        height: 58,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '600',
    },

});

export default LoginScreen;
