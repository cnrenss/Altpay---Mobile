import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../components/Header'; // header'ı import ediyoruz
import BottomPanel from '../components/BottomPanel';

export default function HomeScreen(navigation) {
  const handleMenuPress = () => {
    console.log('Menü açılıyor...');
  };

  const handleAvatarPress = () => {
    console.log('Avatar basıldı.');
  };
  const StatCard = ({title, value}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const QuickCard = ({title, resim}) => (
    <View style={styles.quickcards}>
      <Image source={resim} style={styles.quicpng} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header
        title="Hoşgeldiniz!"
        onMenuPress={handleMenuPress}
        onAvatarPress={handleAvatarPress}
      />

      <View style={styles.container}>
        <StatCard title="Bugünkü Satış" value="1500 TL" />
        <StatCard title="Toplam Link" value="10" />
        <StatCard title="Başarılı İşlem" value="5" />
        <StatCard title="İade / İptal" value="3" />
      </View>
      <View style={styles.serit}>
        <Text style={styles.baslik}> Hızlı İşlemler</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          padding: 3,
          justifyContent: 'space-between',
        }}>

        {/*  Buraya Basıldığonda ilgili sayfalara yönlendirme gelicek!*/}

        <TouchableOpacity onPress={() => alert('Butona basıldı!')}>
          <QuickCard
            title="Link Oluşturma"
            resim={require('../assets/arti.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Butona basıldı!')}>
          <QuickCard
            title="Link Listesi"
            resim={require('../assets/link.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Butona basıldı!')}>
          <QuickCard title="Sanal Pos" resim={require('../assets/cards.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.serit}>
        <Text style={styles.baslik}> Son İşlemler</Text>
      </View>
        <BottomPanel style={styles.bottompanel} navigation={navigation} />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  card: {
    width: 182,
    height: 100,
    backgroundColor: '#E9E9E9',
    borderWidth: 4,
    borderColor: '#0F5A2D',
    borderRadius: 16,
    marginBottom: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  serit: {
    width: 440,
    height: 47,
    backgroundColor: '#59927042',
  },
  baslik: {
    fontSize: 32,
    color: '#0F5A2D',
    fontWeight: '600',
    marginLeft: 14,
  },
  quickcards: {
    width: 132,
    height: 181,
    borderColor: '#0F5A2DAD',
    borderRadius: 30,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 35,
  },
  quicpng: {
    width: 50,
    height: 50,
  },


});
