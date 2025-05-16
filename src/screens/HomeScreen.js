import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import TransactionCard from '../components/TransactionCard';
import { getSuccessfulLinks } from '../api/linkListApi';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

  const StatCard = ({ title, value }) => (
      <View style={styles.statCard}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
  );

  const QuickCard = ({ title, resim }) => (
      <View style={styles.quickCard}>
        <Image source={resim} style={styles.quickImage} />
        <Text style={styles.quickText}>{title}</Text>
      </View>
  );

  return (
      <View style={styles.container}>
        <Header title="Hoşgeldiniz!" />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.statContainer}>
            <StatCard title="Bugünkü Satış" value="1500 TL" />
            <StatCard title="Toplam Link" value="5" />
            <StatCard title="Başarılı İşlem" value="5" />
            <StatCard title="İade / İptal" value="3" />
          </View>

          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.quickContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('LinkCreate')}>
              <QuickCard title={"Link\nOluştur"} resim={require('../assets/arti.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LinkList')}>
              <QuickCard title={"Link\nListesi"} resim={require('../assets/link.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SanalPos')}>
              <QuickCard title={"Sanal\nPos"} resim={require('../assets/cards.png')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Son İşlemler</Text>
          <View style={styles.transactionContainer}>
            {transactions.length === 0 ? (
                <Text style={styles.emptyText}>Gösterilecek bir işlem bulunmamaktadır.</Text>
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
          </View>
        </ScrollView>

        <BottomPanel navigation={navigation} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  scrollContent: {
    paddingBottom: hp('15%'),
    paddingHorizontal: wp('4%'),
  },
  statContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  statCard: {
    width: wp('44%'),
    height: hp('12%'),
    backgroundColor: '#E9E9E9',
    borderWidth: 2,
    borderColor: '#0F5A2D',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  statTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  statValue: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#000',
  },
  sectionTitle: {
    fontSize: wp('7%'),
    color: '#0F5A2D',
    fontWeight: '600',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    backgroundColor:'#59927042',
  },
  quickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  quickCard: {
    width: wp('27%'),
    height: hp('15%'),
    borderColor: '#0F5A2DAD',
    borderRadius: 20,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('2%'),
    backgroundColor: '#FFF',
  },
  quickImage: {
    width: wp('10%'),
    height: wp('10%'),
    marginBottom: hp('1.5%'),
  },
  quickText: {
    textAlign: 'center',
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#000',
  },
  transactionContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: wp('4.5%'),
    fontWeight: '500',
    marginTop: hp('3%'),
    color: '#888',
    textAlign: 'center',
  },
});
