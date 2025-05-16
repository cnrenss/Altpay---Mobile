import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
} from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { getAllLinks } from '../api/linkListApi';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SanalPosScreen({ navigation }) {
    const [allPayments, setAllPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const allLinks = await getAllLinks();
                const filtered = allLinks.filter(link =>
                    link.paymentCase === 'success' || link.paymentCase === 'failed'
                );
                setAllPayments(filtered);
            } catch (error) {
                console.error('Ödeme geçmişi alınamadı:', error.message);
            }
        };

        fetchPayments();
    }, []);

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        const trTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
        return `${trTime.toLocaleDateString('tr-TR')} - ${trTime.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    };

    const renderItem = ({ item }) => {
        const isSuccess = item.paymentCase === 'success';
        const statusText = isSuccess ? 'Ödendi' : 'Başarısız';
        const statusImage = isSuccess
            ? require('../assets/odendi.png')
            : require('../assets/basarisiz.png');
        const statusStyle = isSuccess ? styles.successBorder : styles.failBorder;

        return (
            <View style={styles.card}>
                {/* Müşteri adı + durum badge aynı satır */}
                <View style={styles.topRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/cards.png')} style={styles.icon} />
                        <Text style={styles.customerName}>{item.customerName.substring(0, 14)}</Text>
                    </View>

                    <View style={[styles.statusBadge, statusStyle]}>
                        <Image source={statusImage} style={styles.statusIcon} />
                        <Text style={styles.statusText}>{statusText}</Text>
                    </View>
                </View>

                <Text style={styles.detailText}>İşlem Tarihi: {formatDateTime(item.updatedAt)}</Text>
                <Text style={styles.detailText}>Link Türü: Müşteri Linki</Text>
                <Text style={styles.detailText}>Müşteri Cep: {item.customerPhone}</Text>
                <Text style={styles.detailText}>Tutar: {item.amount} TL</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                title="Sanal Pos İşlemleri"
                onMenuPress={() => console.log('Menü')}
                onAvatarPress={() => console.log('Avatar')}
            />

            <View style={styles.headerImageWrapper}>
                <Image source={require('../assets/sanalpos.png')} style={styles.headerImage} />
                <Text style={styles.headerText}>Sanal POS İşlemleri</Text>
            </View>

            <FlatList
                data={allPayments}
                renderItem={renderItem}
                keyExtractor={(item) => item.uuid}
                contentContainerStyle={{ paddingBottom: hp('15%'), paddingHorizontal: wp('4%') }}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../assets/sanalposundata.png')} style={styles.emptyImage} />
                        <Text style={styles.emptyText}>Henüz ödeme bulunamadı.</Text>
                    </View>
                )}
            />

            <BottomPanel navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F4F4' },
    headerImageWrapper: { alignItems: 'center', marginTop: hp('3%') },
    headerImage: { width: wp('20%'), height: wp('20%'), resizeMode: 'contain' },
    headerText: {
        fontSize: wp('7%'),
        color: '#0F5A2D',
        fontWeight: '600',
        marginTop: hp('1.5%'),
        marginBottom: hp('2%'),
    },
    card: {
        borderWidth: 3,
        borderColor: '#0F5A2D',
        borderRadius: 16,
        padding: wp('4%'),
        marginBottom: hp('2%'),
        backgroundColor: '#FFF',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    icon: {
        width: wp('8%'),
        height: wp('8%'),
        resizeMode: 'contain',
        marginRight: wp('2%'),
    },
    customerName: {
        fontSize: wp('5%'),
        fontWeight: '600',
        color: '#0F5A2D',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.6%'),
        borderRadius: 25,
        width: wp('40%'),
        justifyContent: 'center',
    },
    successBorder: {
        backgroundColor: '#0F5A2D',
    },
    failBorder: {
        backgroundColor: '#981515',
    },
    statusIcon: {
        width: wp('6%'),
        height: wp('6%'),
        marginRight: wp('2%'),
    },
    statusText: {
        color: '#FFF',
        fontSize: wp('4%'),
        fontWeight: '600',
    },
    detailText: {
        fontSize: wp('4%'),
        fontWeight: '600',
        marginTop: hp('0.5%'),
        color: '#333',
    },
    emptyImage: {
        width: wp('30%'),
        height: wp('30%'),
        marginTop: hp('4%'),
        resizeMode: 'contain',
    },
    emptyText: {
        fontSize: wp('4.2%'),
        fontWeight: '600',
        marginTop: hp('1.5%'),
        color: '#777',
        textAlign: 'center',
    },
});
