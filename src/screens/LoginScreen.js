import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser} from '../api/authApi';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('Caner'); //@TODO değer sil
    const [password, setPassword] = useState('caner'); //@TODO değer sil

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


            <View style={{flex:1.9,alignItems: 'center'}}>
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
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Giriş</Text>
                </TouchableOpacity>
            </View>

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
        borderColor: '#0F5A2D',
        borderWidth: 4,
        placeholderColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        color: 'black',
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
