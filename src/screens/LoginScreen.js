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
        <KeyboardAvoidingView
            style={{flex: 1, backgroundColor: '#f4f4f4'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>

            {/* Üst sabit logo */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/AltPayHeader.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.text}>AltPay</Text>
            </View>

            {/* Scrollable alan */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.centerContent}>
                        <Image
                            source={require('../assets/pp.png')}
                            style={styles.pplogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.text2}>AltPay'e Hoşgeldiniz!</Text>
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
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    logo: {
        width: 60,
        height: 60,
    },
    text: {
        fontSize: 40,
        color: '#0F5A2D',
        fontWeight: '900',
        fontStyle: 'italic',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingBottom: 40,
    },
    centerContent: {
        alignItems: 'center',
        marginTop: 10,
    },
    pplogo: {
        marginTop: 10,
        width: 164,
        height: 140,
        marginBottom:10,
    },
    text2: {
        fontSize: 32,
        color: '#0F5A2D',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 35,
    },
    input: {
        width: 300,
        height: 54,
        borderColor: '#0F5A2D',
        borderWidth: 4,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        color: 'black',
        fontSize: 16,
    },
    button: {
        marginTop: 20,
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
