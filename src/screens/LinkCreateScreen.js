import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { createPaymentLink } from '../api/linkApi';

export default function LinkCreateScreen({ navigation }) {
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    React.useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () =>
            setIsKeyboardVisible(true),
        );
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
            setIsKeyboardVisible(false),
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleMenuPress = () => {
        console.log('Menü açılıyor...');
    };

    const handleAvatarPress = () => {
        console.log('Avatar basıldı.');
    };

    const handleCreateLink = async () => {
        try {
            const result = await createPaymentLink(
                customerName,
                customerPhone,
                parseFloat(amount),
                description,
            );
            Alert.alert('Başarılı', 'Link oluşturuldu!');
            console.log(result);
        } catch (error) {
            Alert.alert('Hata', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Header
                        title="Link Oluşturma Sayfası"
                        onMenuPress={handleMenuPress}
                        onAvatarPress={handleAvatarPress}
                    />

                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={require('../assets/addlink.png')}
                                style={styles.anaimage}
                            />
                            <Text style={styles.headtext}>Link Oluştur</Text>
                            <Text style={styles.descriptiontext}>
                                Müşterine Özel Ödeme Linki Oluştur.
                            </Text>

                            <View style={styles.borderinput}>
                                <Image
                                    style={{ marginLeft: 10, width: 40, height: 40 }}
                                    source={require('../assets/inputuser.png')}
                                />
                                <TextInput
                                    placeholder="Müşteri Adı Soyadı"
                                    placeholderTextColor="#7A7A7A"
                                    value={customerName}
                                    onChangeText={setCustomerName}
                                    style={styles.input}
                                />
                            </View>

                            <View style={styles.borderinput}>
                                <Image
                                    style={{ marginLeft: 10, width: 40, height: 40 }}
                                    source={require('../assets/price.png')}
                                />
                                <TextInput
                                    placeholder="Tutar"
                                    value={amount}
                                    onChangeText={setAmount}
                                    placeholderTextColor="#7A7A7A"
                                    keyboardType="numeric"
                                    style={styles.input}
                                />
                            </View>

                            <View style={styles.borderinput}>
                                <Image
                                    style={{ marginLeft: 10, width: 40, height: 40 }}
                                    source={require('../assets/phone.png')}
                                />
                                <TextInput
                                    placeholder="Müşteri Cep Telefonu"
                                    placeholderTextColor="#7A7A7A"
                                    style={styles.input}
                                    value={customerPhone}
                                    onChangeText={setCustomerPhone}
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={styles.borderinput}>
                                <Image
                                    style={{ marginLeft: 10, width: 40, height: 40 }}
                                    source={require('../assets/Notes.png')}
                                />
                                <TextInput
                                    placeholder="Açıklama"
                                    placeholderTextColor="#7A7A7A"
                                    style={styles.input}
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleCreateLink}>
                                <Text style={styles.buttontext}>Linki Oluştur</Text>
                                <Image
                                    style={{ marginLeft: 15, width: 40, height: 40 }}
                                    source={require('../assets/whitelink.png')}
                                />
                            </TouchableOpacity>

                            <Text style={styles.infoText}>
                                Link oluşturulduktan sonra link listesinde görüntülenir.
                            </Text>
                        </View>
                    </ScrollView>

                    {!isKeyboardVisible && (
                        <BottomPanel style={styles.bottompanel} navigation={navigation} />
                    )}
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
    scrollContent: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    imageWrapper: {
        alignItems: 'center',
        marginTop: 10,
    },
    anaimage: {
        marginTop: 30,
        width: 97,
        height: 95,
        resizeMode: 'contain',
    },
    headtext: {
        fontSize: 36,
        color: '#0F5A2D',
        fontWeight: '600',
        marginTop: 10,
    },
    descriptiontext: {
        fontWeight: '600',
        color: '#0F5A2D',
        fontSize: 20,
        marginTop: 14,
        marginBottom: 20,
    },
    borderinput: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: '#0F5A2D',
        width: 350,
        height: 60,
        borderRadius: 20,
        marginBottom: 25,
        paddingRight: 10,
    },
    input: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
        marginLeft: 10,
    },
    button: {
        flexDirection: 'row',
        borderWidth: 4,
        borderRadius: 40,
        borderColor: '#0F5A2D',
        backgroundColor: '#0F5A2D',
        width: 330,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttontext: {
        fontWeight: '600',
        fontSize: 32,
        color: '#FFF',
    },
    infoText: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        color: 'gray',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    bottompanel: {
        paddingBottom: 60,
    },
});
