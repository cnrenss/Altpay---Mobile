import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const handleMenuPress = () => {
    console.log('Menü açılıyor...');
  };

  const handleAvatarPress = () => {
    console.log('Avatar basıldı.');
  };
    const navigation = useNavigation();

    const openPass = () => {
        navigation.navigate('UpdatePass');
    };
    const openAcc = () => {
        navigation.navigate('UpdateAcc');
    };
  return (
    <View style={styles.container}>
      <Header
        title="Profil ve Ayarlar"
        onMenuPress={handleMenuPress}
        onAvatarPress={handleAvatarPress}
      />
      <Image source={require('../assets/avatar.png')} style={styles.logo} />
      <Text style={styles.headtext}>NAME-SURNAME</Text>

      <View style={styles.borderone}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/gmail.png')}
            style={styles.borderlogo}
          />
          <Text style={styles.bordertext}>erdem@alttantire.com</Text>
        </View>
        <View style={styles.bordercizgi}></View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/phone.png')}
            style={styles.borderlogo}
          />
          <Text style={styles.bordertext}>05452170084</Text>
        </View>
      </View>

      <View style={styles.borderone}>
        <TouchableOpacity onPress={openAcc}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/ppsettings.png')}
              style={styles.borderlogo}
            />
            <Text style={styles.bordertextalt}>Hesap Ayarları</Text>
            <View style={{flex: 1, alignItems: 'flex-end', marginTop: 34}}>
              <Image
                source={require('../assets/detay.png')}
                style={[styles.detaylogo]}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.bordercizgi}></View>
        <TouchableOpacity onPress={openPass}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/pppass.png')}
              style={styles.borderlogo}
            />
            <Text style={styles.bordertextalt}>Şifreyi Değiştir</Text>
            <View style={{flex: 1, alignItems: 'flex-end', marginTop: 34}}>
              <Image
                source={require('../assets/detay.png')}
                style={[styles.detaylogo]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  detaylogo: {
    width: 20,
    height: 20,
    marginRight: 30,
  },
  bordercizgi: {
    marginTop: 25.5,
    borderWidth: 1,
    borderColor: '#0F5A2D',
  },
  bordertext: {
    fontSize: 20,
    marginLeft: 21,
    marginTop: 30,
    fontWeight: 600,
  },
  bordertextalt: {
    fontSize: 20,
    marginLeft: 21,
    marginTop: 24,
    fontWeight: 600,
  },
  borderlogo: {
    marginTop: 26,
    width: 40,
    height: 40,
    marginLeft: 21,
  },
  borderone: {
    marginTop: 33,
    borderWidth: 4,
    borderColor: '#0F5A2D',
    width: 371,
    height: 183,
    borderRadius: 20,
  },
  logo: {
    marginTop: 33,
    width: 161,
    height: 147,
  },
  headtext: {
    fontSize: 36,
    color: '#0F5A2D',
    fontWeight: '600',
  },
});
