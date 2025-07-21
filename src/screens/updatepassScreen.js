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
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { updatePassword } from '../api/authApi';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function UpdatePassScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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

  const renderInput = (label, value, setValue, showPass, setShowPass) => (
      <View style={styles.inputSection}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
          <TextInput
              placeholder={`${label} giriniz`}
              placeholderTextColor="#7A7A7A"
              secureTextEntry={!showPass}
              value={value}
              onChangeText={setValue}
              style={styles.input}
              keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Image source={require('../assets/eye.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
  );

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Header title="Şifre Güncelleme" />
            <ScrollView contentContainerStyle={styles.scroll}>
              <Text style={styles.title}>Şifre Güncelleme</Text>

              {renderInput('Eski Şifre', oldPassword, setOldPassword, showOldPass, setShowOldPass)}
              {renderInput('Yeni Şifre', newPassword, setNewPassword, showNewPass, setShowNewPass)}
              {renderInput('Yeni Şifre Tekrar', newPasswordRepeat, setNewPasswordRepeat, showRepeatPass, setShowRepeatPass)}

              <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
                <Text style={styles.buttonText}>Şifreyi Güncelle</Text>
              </TouchableOpacity>
            </ScrollView>

            {!keyboardVisible && <BottomPanel navigation={navigation} />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: hp('10%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: '600',
    color: '#0F5A2D',
    marginVertical: hp('3%'),
  },
  inputSection: {
    width: wp('90%'),
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('4.8%'),
    color: '#0F5A2D',
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#0F5A2D',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    height: hp('7.5%'),
  },
  input: {
    flex: 1,
    fontSize: wp('4.5%'),
    color: '#000',
    fontWeight: '600',
  },
  eyeIcon: {
    width: wp('6%'),
    height: wp('6%'),
    tintColor: '#0F5A2D',
  },
  button: {
    marginTop: hp('3%'),
    backgroundColor: '#0F5A2D',
    width: wp('80%'),
    height: hp('8%'),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F5A2D',
  },
  buttonText: {
    color: '#FFF',
    fontSize: wp('5.5%'),
    fontWeight: '600',
  },
});
