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
import BottomPanel from '../components/BottomPanel';
import { getUserProfile } from '../api/authApi';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function UpdateAccScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    companyname: '',
    iban: '',
  });

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

  return (
      <View style={styles.container}>
        <Header title="Hesap Ayarları" />

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Hesap Ayarları</Text>

          {/* Ad Soyad */}
          <View style={styles.section}>
            <Text style={styles.label}>Ad Soyad</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{profile.name} {profile.surname}</Text>
            </View>
          </View>

          {/* Şirket Adı */}
          <View style={styles.section}>
            <Text style={styles.label}>Şirket Adı</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{profile.companyname}</Text>
            </View>
          </View>

          {/* IBAN */}
          <View style={styles.section}>
            <Text style={styles.label}>IBAN</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{profile.iban}</Text>
            </View>
          </View>

          {/* Logo Yükle */}
          <TouchableOpacity>
            <View style={styles.uploadBox}>
              <Image source={require('../assets/upload.png')} style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Logo Yükle</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <BottomPanel navigation={navigation} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: hp('15%'),
  },
  title: {
    marginTop: hp('4%'),
    fontSize: wp('7%'),
    fontWeight: '600',
    color: '#0F5A2D',
    marginBottom: hp('3%'),
  },
  section: {
    width: wp('90%'),
    marginBottom: hp('2.5%'),
  },
  label: {
    fontSize: wp('5%'),
    color: '#0F5A2D',
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  infoBox: {
    width: '100%',
    height: hp('7.5%'),
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0F5A2D',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  infoText: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#000',
  },
  uploadBox: {
    marginTop: hp('1.5%'),
    width: wp('55%'),
    height: hp('16%'),
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#0F5A2D',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: wp('12%'),
    height: wp('12%'),
    marginBottom: hp('1%'),
  },
  uploadText: {
    fontSize: wp('4.5%'),
    color: '#0F5A2D',
    fontWeight: '600',
  },
});
