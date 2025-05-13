import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import TransactionCard from '../components/TransactionCard';


export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchMockTransactions = () => {
      const data = [
        { id: 1, name: 'Caner Uludağ', date: '02.05.2025 11:00', amount: 500 },
        { id: 2, name: 'Ezgi Öztürk', date: '02.05.2025 12:30', amount: 750 },
        { id: 3, name: 'Ahmet Demir', date: '02.05.2025 14:10', amount: 300 },
      ];
      setTransactions(data);
    };

    fetchMockTransactions();
  }, []);

  const handleMenuPress = () => {
    console.log('Menü açılıyor...');
  };

  const handleAvatarPress = () => {
    console.log('Avatar basıldı.');
  };

  const StatCard = ({ title, value }) => (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
  );

  const QuickCard = ({ title, resim }) => (
      <View style={styles.quickcards}>
        <Image source={resim} style={styles.quicpng} />
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
  );


  return (
      <View style={{ flex: 1 ,backgroundColor:'#F4F4F4' }}>
        <Header
            title="Hoşgeldiniz!"
            onMenuPress={handleMenuPress}
            onAvatarPress={handleAvatarPress}
        />
        <ScrollView>
        <View style={styles.container}>
          <StatCard title="Bugünkü Satış" value="1500 TL" />
          <StatCard title="Toplam Link" value="5" />
          <StatCard title="Başarılı İşlem" value="5" />
          <StatCard title="İade / İptal" value="3" />
        </View>

        <View style={styles.serit}>
          <Text style={styles.baslik}> Hızlı İşlemler</Text>
        </View>

        <View style={styles.quickContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('LinkCreate')}>
            <QuickCard title={
              <>
                Link {'\n'} Oluştur
              </>
            } resim={require('../assets/arti.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LinkList')}>
            <QuickCard title="Link Listesi" resim={require('../assets/link.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SanalPos')}>
            <QuickCard title="Sanal Pos" resim={require('../assets/cards.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.serit}>
          <Text style={styles.baslik}> Son İşlemler</Text>
        </View>

        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100,        marginTop: 15,
        }}>
          {transactions.map(item => (
              <TransactionCard
                  key={item.id}
                  name={item.name}
                  date={item.date}
                  amount={item.amount}
              />
          ))}
        </ScrollView>
        </ScrollView>

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
    justifyContent: 'center',
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
  quickContainer: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
});
