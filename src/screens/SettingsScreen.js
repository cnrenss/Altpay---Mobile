import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import { getUserProfile } from '../api/authApi';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SettingsScreen() {
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('Profil alınamadı:', error.message);
      }
    };

    fetchProfile();
  }, []);

  const openPass = () => navigation.navigate('UpdatePass');
  const openAcc = () => navigation.navigate('UpdateAcc');

  return (
      <View style={styles.container}>
        <Header title="Profil ve Ayarlar" />

        <ScrollView contentContainerStyle={styles.scroll}>
          <Image source={require('../assets/avatar.png')} style={styles.avatar} />
          <Text style={styles.name}>
            {profile.name} {profile.surname}
          </Text>

          {/* Mail ve Telefon kutusu */}
          <View style={styles.box}>
            <View style={styles.boxRow}>
              <Image source={require('../assets/gmail.png')} style={styles.icon} />
              <Text style={styles.boxText}>{profile.email}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.boxRow}>
              <Image source={require('../assets/phone.png')} style={styles.icon} />
              <Text style={styles.boxText}>{profile.phone}</Text>
            </View>
          </View>

          {/* Hesap Ayarları */}
          <View style={styles.box}>
            <TouchableOpacity onPress={openAcc}>
              <View style={styles.boxRow}>
                <Image source={require('../assets/ppsettings.png')} style={styles.icon} />
                <Text style={styles.boxText}>Hesap Ayarları</Text>
                <Image source={require('../assets/detay.png')} style={styles.arrow} />
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={openPass}>
              <View style={styles.boxRow}>
                <Image source={require('../assets/pppass.png')} style={styles.icon} />
                <Text style={styles.boxText}>Şifreyi Değiştir</Text>
                <Image source={require('../assets/detay.png')} style={styles.arrow} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: hp('10%'),
  },
  avatar: {
    width: wp('40%'),
    height: wp('40%'),
    resizeMode: 'contain',
    marginTop: hp('3%'),
  },
  name: {
    fontSize: wp('7%'),
    fontWeight: '600',
    color: '#0F5A2D',
    marginVertical: hp('2%'),
  },
  box: {
    width: wp('90%'),
    borderWidth: 3,
    borderRadius: 16,
    borderColor: '#0F5A2D',
    marginBottom: hp('2.5%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
  },
  boxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  icon: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  boxText: {
    flex: 1,
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#000',
    marginLeft: wp('2%'),
  },
  line: {
    height: 1,
    backgroundColor: '#0F5A2D',
    marginVertical: hp('1.5%'),
  },
  arrow: {
    width: wp('5%'),
    height: wp('5%'),
    resizeMode: 'contain',
    tintColor: '#0F5A2D',
  },
});
