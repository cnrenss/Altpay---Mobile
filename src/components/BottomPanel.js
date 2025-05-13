import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Image,
} from 'react-native';

export default function BottomPanel({navigation}) {
  const [centerModalVisible, setCenterModalVisible] = useState(false);
  const [leftModalVisible, setLeftModalVisible] = useState(false);

  return (
    <>
      <View style={styles.panel}>
        <TouchableOpacity onPress={() => setLeftModalVisible(true)}>
          <Image
            source={require('../assets/istatistik.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCenterModalVisible(true)}>
          <Image
            source={require('../assets/soru.png')}
            style={styles.centerIcon}
          />
        </TouchableOpacity>
        {/* Buraya Koşul Eklenicek. Giriş Yapamayan kullanıcı settings'i açamayacak!*/}
        <TouchableOpacity onPress={() => navigation.navigate('settings')}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={leftModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLeftModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Sol İçerik Sonradan Gelecek</Text>
            <TouchableOpacity onPress={() => setLeftModalVisible(false)}>
              <Text style={{marginTop: 10, color: 'blue'}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Orta Modal */}
      <Modal
        visible={centerModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCenterModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text> İçerik Sonradan Gelecek</Text>
            <TouchableOpacity onPress={() => setCenterModalVisible(false)}>
              <Text style={{marginTop: 10, color: 'blue'}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  panel: {
    height: 83,
    backgroundColor: '#0F5A2D',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: 'white', // İstersen ikonları beyazlaştırırsın
  },
  centerIcon: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});
