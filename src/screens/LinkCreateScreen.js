import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { createPaymentLink } from '../api/linkApi';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function LinkCreateScreen({ navigation }) {
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const handleCreateLink = async () => {
        try {
            const result = await createPaymentLink(customerName, customerPhone, parseFloat(amount), description);
            Alert.alert('Başarılı', 'Link oluşturuldu!');
            console.log(result);
        } catch (error) {
            Alert.alert('Hata', error.message);
        }
    };

    const renderInput = (placeholder, icon, value, setValue, keyboardType = 'default') => (
        <View style={styles.inputWrapper}>
            <Image source={icon} style={styles.icon} />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#7A7A7A"
                style={styles.input}
                value={value}
                onChangeText={setValue}
                keyboardType={keyboardType}
            />
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Header title="Link Oluşturma Sayfası" />

                    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                        <Image source={require('../assets/addlink.png')} style={styles.banner} />
                        <Text style={styles.title}>Link Oluştur</Text>
                        <Text style={styles.subtitle}>Müşterine Özel Ödeme Linki Oluştur.</Text>

                        {renderInput('Müşteri Adı Soyadı', require('../assets/inputuser.png'), customerName, setCustomerName)}
                        {renderInput('Tutar', require('../assets/price.png'), amount, setAmount, 'numeric')}
                        {renderInput('Müşteri Cep Telefonu', require('../assets/phone.png'), customerPhone, setCustomerPhone, 'phone-pad')}
                        {renderInput('Açıklama', require('../assets/Notes.png'), description, setDescription)}

                        <TouchableOpacity style={styles.button} onPress={handleCreateLink}>
                            <Text style={styles.buttonText}>Linki Oluştur</Text>
                            <Image source={require('../assets/whitelink.png')} style={styles.buttonIcon} />
                        </TouchableOpacity>

                        <Text style={styles.infoText}>Link oluşturulduktan sonra link listesinde görüntülenir.</Text>
                    </ScrollView>

                    {!isKeyboardVisible && <BottomPanel navigation={navigation} />}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    scroll: {
        alignItems: 'center',
        paddingBottom: hp('10%'),
    },
    banner: {
        width: wp('25%'),
        height: wp('25%'),
        resizeMode: 'contain',
        marginTop: hp('3%'),
    },
    title: {
        fontSize: wp('8%'),
        color: '#0F5A2D',
        fontWeight: '600',
        marginTop: hp('1.5%'),
    },
    subtitle: {
        fontSize: wp('4.5%'),
        color: '#0F5A2D',
        fontWeight: '600',
        marginVertical: hp('2%'),
        textAlign: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#0F5A2D',
        width: wp('90%'),
        height: hp('7.5%'),
        borderRadius: 20,
        marginBottom: hp('2.5%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: '#FFF',
    },
    icon: {
        width: wp('8%'),
        height: wp('8%'),
        marginRight: wp('2%'),
    },
    input: {
        flex: 1,
        fontSize: wp('4.5%'),
        color: 'black',
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F5A2D',
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#0F5A2D',
        width: wp('85%'),
        height: hp('8%'),
        justifyContent: 'center',
        marginTop: hp('2%'),
    },
    buttonText: {
        fontSize: wp('6%'),
        fontWeight: '600',
        color: '#FFF',
    },
    buttonIcon: {
        width: wp('8%'),
        height: wp('8%'),
        marginLeft: wp('3%'),
    },
    infoText: {
        fontSize: wp('3.8%'),
        fontWeight: '600',
        color: 'gray',
        textAlign: 'center',
        paddingHorizontal: wp('5%'),
        marginTop: hp('2%'),
    },
});
