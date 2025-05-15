import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { getUserProfile } from '../api/authApi';

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
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.baslik}> Hesap Ayarları </Text>

          <View style={{ alignSelf: 'flex-start', marginLeft: 35 }}>
            <Text style={styles.borderheader}>Ad Soyad</Text>
          </View>
          <View style={styles.border}>
            <Text style={styles.placetext}>{profile.name} {profile.surname}</Text>
          </View>

          <View style={{ alignSelf: 'flex-start', marginLeft: 35 }}>
            <Text style={styles.borderheader}>Şirket Adı</Text>
          </View>
          <View style={styles.border}>
            <Text style={styles.placetext}>{profile.companyname}</Text>
          </View>

          <View style={{ alignSelf: 'flex-start', marginLeft: 35 }}>
            <Text style={styles.borderheader}>IBAN</Text>
          </View>
          <View style={styles.border}>
            <Text style={styles.placetext}>{profile.iban}</Text>
          </View>

          <TouchableOpacity>
            <View style={styles.uploadborder}>
              <Image source={require('../assets/upload.png')} style={styles.image} />
              <Text style={styles.borderheader}> Logo Yükle</Text>
            </View>
          </TouchableOpacity>
        </View>
        <BottomPanel navigation={navigation} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  image: {
    marginTop: 10,
    width: 50,
    height: 50,
  },
  uploadborder: {
    alignItems: 'center',
    width: 200,
    height: 129,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#0F5A2D',
    marginTop: 10,
  },
  borderheader: {
    fontSize: 24,
    color: '#0F5A2D',
    fontWeight: '600',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  baslik: {
    marginTop: 45,
    color: '#0F5A2D',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 35,
  },
  placetext: {
    marginLeft: 24,
    fontSize: 20,
    fontWeight: '600',
  },
  border: {
    width: 362,
    height: 81,
    borderRadius: 20,
    borderColor: '#0F5A2D',
    backgroundColor: '#f2f2f2',
    borderWidth: 2,
    justifyContent: 'center',
    marginBottom: 25,
  },
});
