import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
  Image,
} from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { updatePassword } from '../api/authApi';

export default function UpdateAccScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Şifre gösterme/gizleme için state'ler
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  const handlePasswordUpdate = async () => {
    try {
      const result = await updatePassword(oldPassword, newPassword, newPasswordRepeat);
      Alert.alert('Başarılı', result.message);
      setOldPassword('');
      setNewPassword('');
      setNewPasswordRepeat('');
    } catch (error) {
      Alert.alert('Hata', error.message);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
      >
        <Header title="Şifre Güncelleme" />
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>
          <Text style={styles.baslik}> Şifre Güncelleme </Text>

          {/* Eski Şifre */}
          <View style={{ alignSelf: 'flex-start', marginLeft: 35 }}>
            <Text style={styles.borderheader}>Eski Şifre</Text>
          </View>
          <View style={styles.border}>
            <View style={styles.inputWrapper}>
              <TextInput
                  placeholder="Mevcut Şifrenizi Giriniz.."
                  placeholderTextColor="#7A7A7A"
                  style={styles.placetextInput}
                  secureTextEntry={!showOldPass}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  keyboardType="numeric"
              />
              <TouchableOpacity onPress={() => setShowOldPass(!showOldPass)}>
                <Image source={require('../assets/eye.png')} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Yeni Şifre */}
          <View style={{ alignSelf: 'flex-start', marginLeft: 35 }}>
            <Text style={styles.borderheader}>Yeni Şifre</Text>
          </View>
          <View style={styles.border}>
            <View style={styles.inputWrapper}>
              <TextInput
                  placeholder="Yeni Şifrenizi Giriniz."
                  placeholderTextColor="#7A7A7A"
                  style={styles.placetextInput}
                  secureTextEntry={!showNewPass}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  keyboardType="numeric"
              />
              <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                <Image source={require('../assets/eye.png')} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Yeni Şifre Tekrar */}
          <View style={{ alignSelf: 'flex-start', marginLeft: 35 }}>
            <Text style={styles.borderheader}>Yeni Şifre Tekrar</Text>
          </View>
          <View style={styles.border}>
            <View style={styles.inputWrapper}>
              <TextInput
                  placeholder="Yeni Şifrenizi Giriniz."
                  placeholderTextColor="#7A7A7A"
                  style={styles.placetextInput}
                  secureTextEntry={!showRepeatPass}
                  value={newPasswordRepeat}
                  onChangeText={setNewPasswordRepeat}
                  keyboardType="numeric"
              />
              <TouchableOpacity onPress={() => setShowRepeatPass(!showRepeatPass)}>
                <Image source={require('../assets/eye.png')} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handlePasswordUpdate}>
            <View style={styles.uploadborder}>
              <Text style={styles.text}> Şifreyi Güncelle </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {!keyboardVisible && <BottomPanel navigation={navigation} />}
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  uploadborder: {
    backgroundColor: '#0F5A2D',
    alignItems: 'center',
    justifyContent: 'center',
    width: 362,
    height: 81,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#0F5A2D',
    marginTop: 10,
    marginBottom: 30,
  },
  borderheader: {
    fontSize: 24,
    color: '#0F5A2D',
    fontWeight: '600',
    marginBottom: 15,
  },
  baslik: {
    marginTop: 45,
    color: '#0F5A2D',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 35,
  },
  placetextInput: {
    flex: 1,
    color: 'black',
    fontSize: 18,
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
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#0F5A2D',
    marginLeft: 10,
  },
});
