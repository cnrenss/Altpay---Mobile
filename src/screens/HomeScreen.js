import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import TransactionCard from '../components/TransactionCard';
import { getSuccessfulLinks } from '../api/linkListApi';

export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const links = await getSuccessfulLinks();
        const formatted = links.map(link => ({
          id: link.id,
          name: link.customerName,
          date: new Date(link.updatedAt).toLocaleString('tr-TR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
          }),
          amount: link.amount,
        }));
        setTransactions(formatted);
      } catch (error) {
        console.error('İşlemler alınamadı:', error.message);
      }
    };

    fetchTransactions();
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

          <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 100,
                marginTop: 15,
              }}
          >
            {transactions.length === 0 ? (
                <Text style={styles.emptyWarning}>Gösterilecek bir işlem bulunmamaktadır.</Text>
            ) : (
                transactions.map(item => (
                    <TransactionCard
                        key={item.id}
                        name={item.name}
                        date={item.date}
                        amount={item.amount}
                    />
                ))
            )}
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
  emptyWarning:{
    fontSize: 19,
    fontWeight:'semibold',
    marginTop:30,
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
