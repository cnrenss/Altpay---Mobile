import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { getAllLinks } from '../api/linkListApi';

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
        const turkishTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);

        const formattedDate = turkishTime.toLocaleDateString('tr-TR');
        const formattedTime = turkishTime.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDate} - ${formattedTime}`;
    };

    const renderItem = ({ item }) => {
        const isSuccess = item.paymentCase === 'success';
        const statusText = isSuccess ? 'Ödendi' : 'Başarısız';
        const statusImage = isSuccess
            ? require('../assets/odendi.png')
            : require('../assets/basarisiz.png');
        const statusStyle = isSuccess ? styles.successBorder : styles.statusborder;

        return (
            <View style={styles.border}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/cards.png')} style={styles.borderimage} />
                    <Text style={styles.cardnumbertext}> {item.customerName.substring(0, 14)}</Text>

                    <View style={statusStyle}>
                        <Image style={styles.statusimage} source={statusImage} />
                        <Text style={styles.statustext}>{statusText}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.cardtext}>İşlem Tarihi:</Text>
                    <Text style={styles.cardtextanswer}>{formatDateTime(item.updatedAt)}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.cardtext}>Link Türü:</Text>
                    <Text style={styles.cardtextanswer}>Müşteri Linki</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.cardtext}>Müşteri Cep:</Text>
                    <Text style={styles.cardtextanswer}>{item.customerPhone}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.cardtext}>Tutar:</Text>
                    <Text style={styles.cardtextanswer}>{item.amount} TL</Text>
                </View>
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

            <View style={styles.imageWrapper}>
                <Image source={require('../assets/sanalpos.png')} style={styles.anaimage} />
                <Text style={styles.headertext}> Sanal POS İşlemleri</Text>

                <FlatList
                    data={allPayments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uuid}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/sanalposundata.png')} style={styles.undataimage} />
                            <Text style={styles.undatatext}>Henüz ödeme bulunamadı.</Text>
                        </View>
                    )}
                />

            </View>

            <BottomPanel navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1 },
    imageWrapper: { flex: 1, alignItems: 'center' },
    anaimage: { width: 90, height: 90, marginTop: 50 },
    headertext: {
        fontSize: 36,
        color: '#0F5A2D',
        fontWeight: '600',
        marginTop: 18,
        marginBottom: 40,
    },
    border: {
        borderWidth: 4,
        width: 390,
        height: 230,
        borderRadius: 20,
        marginBottom: 18,
        borderColor: '#0F5A2D',

    },
    borderimage: {
        width: 40,
        height: 40,
        marginTop: 15,
        marginLeft: 13,

    },
    cardnumbertext: {
        color: '#0F5A2D',
        fontSize: 24,
        marginLeft: 11,
        marginTop: 15,
        fontWeight: '600',
        width:190,
    },
    statusborder: {
        alignItems: 'center',
        flexDirection: 'row',

        borderWidth: 2,
        width: 160,
        height: 45,
        borderRadius: 30,
        marginTop: 10,
        backgroundColor: '#981515',
        borderColor: '#981515',
    },
    successBorder:{
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 15,
        borderWidth: 2,
        width: 160,
        height: 45,
        borderRadius: 30,
        marginTop: 10,
        backgroundColor: '#0F5A2D',
        borderColor: '#0F5A2D',

    },

    statusimage: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    statustext: {
        fontSize: 20,
        marginLeft: 4,
        color: '#FFF',
    },
    cardtext: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 13,
        width: 140,
    },
    cardtextanswer: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 13,
    },
    undataimage: {
        marginTop: 20,
        width: 120,
        height: 120,
    },
    undatatext: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
    },
});
