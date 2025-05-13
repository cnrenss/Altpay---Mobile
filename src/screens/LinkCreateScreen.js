
import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity,Alert } from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { createPaymentLink } from '../api/linkApi';


export default function LinkCreateScreen({navigation}) {
    const handleMenuPress = () => {
        console.log('Menü açılıyor...');
    };

    const handleAvatarPress = () => {
        console.log('Avatar basıldı.');
    };
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const handleCreateLink = async () => {
        try {
            const result = await createPaymentLink(customerName,customerPhone, parseFloat(amount), description);
            Alert.alert('Başarılı', 'Link oluşturuldu!');


                console.log(result);
        } catch (error) {
            Alert.alert('Hata', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title="Link Oluşturma Sayfası"
                onMenuPress={handleMenuPress}
                onAvatarPress={handleAvatarPress}
            />

            <View style={styles.imageWrapper}>
                <Image
                    source={require('../assets/addlink.png')}
                    style={styles.anaimage}
                />
                <Text style={styles.headtext}> Link Oluştur</Text>
                <Text style={styles.descriptiontext}> Müşterine Özel Ödeme Linki Oluştur.</Text>
                <View style={styles.borderinput }>
                    <Image style={{marginLeft:10, width:40,height:40}} source={require('../assets/inputuser.png')} />
                    <TextInput
                        placeholder="Müşteri Adı Soyadı"
                        placeholderTextColor="#7A7A7A"
                        value={customerName}
                        onChangeText={setCustomerName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.borderinput }>
                    <Image style={{marginLeft:10,width:40,height:40}} source={require('../assets/price.png')} />
                    <TextInput
                        placeholder="Tutar"
                        value={amount}
                        onChangeText={setAmount}
                        placeholderTextColor="#7A7A7A"
                        style={styles.input}
                    />
                </View>
                <View style={styles.borderinput }>
                    <Image style={{marginLeft:10,width:40,height:40}} source={require('../assets/phone.png')} />
                    <TextInput
                        placeholder="Müşteri Cep Telefonu"
                        placeholderTextColor="#7A7A7A"
                        style={styles.input}
                        value={customerPhone}
                        onChangeText={setCustomerPhone}
                    />
                </View>
                <View style={styles.borderinput }>
                    <Image style={{marginLeft:10,width:40,height:40}} source={require('../assets/Notes.png')} />
                    <TextInput
                        placeholder="Açıklama"
                        placeholderTextColor="#7A7A7A"
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleCreateLink}>
                    <Text style={styles.buttontext}> Linki Oluştur</Text>
                    <Image style={{marginLeft:15, width:40,height:40,}} source={require('../assets/whitelink.png')} />
                </TouchableOpacity>

                <Text style={{fontSize:16, fontWeight:600, marginTop:20, color:'gray',}}> Link oluşturulduktan sonra link listesinde görüntülenir.</Text>
                <BottomPanel style={styles.bottompanel} navigation={navigation} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageWrapper: {
        flex: 1,
        alignItems:'center',
    },
    anaimage: {
        marginTop:30,
        width: 97,
        height: 95,
        resizeMode: 'contain',
    },
    headtext:{
        fontSize: 36,
        color: '#0F5A2D',
        fontWeight: '600',
        marginTop: 10,
    },
    descriptiontext:{
        fontWeight: 600,
        color: '#0F5A2D',
        fontSize: 20,
        marginTop: 14,
        marginBottom:20,
    },
    borderinput:{
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: '#0F5A2D',
        width: 350,
        height: 60,
        borderRadius: 20,
        marginBottom:25,
    },
    input:{
        color : 'dark',
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
    },
    button:{
        flexDirection: 'row',
        borderWidth: 4,
        borderRadius:40,
        borderColor: '#0F5A2D',
        backgroundColor: '#0F5A2D',
        width: 330,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontext:{
        fontWeight:600,
        fontSize: 32,
        color: '#FFF',
    },

    bottompanel: {
        flex: 1,
        paddingBottom: 60,
    },
});
