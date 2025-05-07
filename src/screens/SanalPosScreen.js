import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';

export default function SanalPosScreen ({navigation})  {
    const handleMenuPress = () => {
        console.log('Menü açılıyor...');
    };

    const handleAvatarPress = () => {
        console.log('Avatar basıldı.');
    };



    return (
        <View style={styles.container}>
            <Header
                title="Sanal Pos İşlemleri"
                onMenuPress={handleMenuPress}
                onAvatarPress={handleAvatarPress}
            />
            <View style={styles.imageWrapper}>
                <Image source={require('../assets/sanalpos.png')} style={styles.anaimage} />
                <Text style={styles.headertext}> Sanal POS İşlemleri</Text>
                <View style={styles.border}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../assets/cards.png')} style={styles.borderimage} />
                        <Text style={styles.cardnumbertext}> **** 4HANE</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginTop: 10}}>
                        <Text style={styles.cardtext}> İşlem Tarihi:</Text>
                        <Text style={styles.cardtext}> 26,05,2025</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginTop: 10}}>
                        <Text style={styles.cardtext}> Link Türü:</Text>
                        <Text style={styles.cardtext}> Müşteri Linki</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginTop: 10}}>
                        <Text style={styles.cardtext}> Müşteri Cep:</Text>
                        <Text style={styles.cardtext}> 05452170084</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginTop: 10}}>
                        <Text style={styles.cardtext}> Tutar:</Text>
                        <Text style={styles.cardtext}> 1000TL</Text>
                    </View>
                </View>
                <View style={styles.buttonborder}>
                    <Text> asd</Text>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headertext: {
        fontSize: 36,
        color: '#0F5A2D',
        fontWeight: 600,
        marginTop: 18,
        marginBottom: 40,
    },
    imageWrapper: {
        flex: 1,
        alignItems:'center',
    },
    anaimage: {
        width: 90,
        height: 90,
        marginTop: 50,
    },
    border:{
      borderWidth: 4,
      width: 390,
      height: 230,
      borderRadius: 20,
      marginBottom: 18,
      borderColor:'#0F5A2D',
    },
    borderimage:{
        width: 40,
        height: 40,
        marginTop:22,
        marginLeft:13,
    },
    cardnumbertext:{
        color:'#0F5A2D',
        fontSize: 24,
        marginLeft:11,
        marginTop:26,
        fontWeight: '600',
    },
    cardtext:{
        fontSize: 20,
        fontWeight: '500',
        marginLeft:13,
    },
    buttonborder:{
        borderColor:'black',
        width: 330,
        height: 70,
        borderWidth: 2,
        borderRadius:40,
    },
});

