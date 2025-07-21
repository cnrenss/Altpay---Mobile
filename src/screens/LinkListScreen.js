import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import { getAllLinks, updateLinkStatus } from '../api/linkListApi';
import Clipboard from '@react-native-clipboard/clipboard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function LinkListScreen({ navigation }) {
    const [links, setLinks] = useState([]);
    const [showMenuFor, setShowMenuFor] = useState(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const data = await getAllLinks();
                setLinks(data);
            } catch (error) {
                console.error('Link çekme hatası:', error.message);
            }
        };
        fetchLinks();
    }, []);

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        const trTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
        return `${trTime.toLocaleDateString('tr-TR')} - ${trTime.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    };

    const handleCopyLink = (uuid) => {
        const paymentUrl = `http://localhost:3000/link/${uuid}/pay`;
        Clipboard.setString(paymentUrl);
        console.log('Link kopyalandı:', paymentUrl);
    };

    const handleStatusChange = async (uuid, newStatus) => {
        try {
            await updateLinkStatus(uuid, newStatus);
            const updatedLinks = links.map(link =>
                link.uuid === uuid ? { ...link, status: newStatus } : link
            );
            setLinks(updatedLinks);
            setShowMenuFor(null);
        } catch (error) {
            console.error('Durum güncellenirken hata:', error.message);
        }
    };

    const renderLinkItem = ({ item }) => {
        let statusStyle, statusText, statusIcon;

        switch (item.status) {
            case 'tamamlandi':
                statusStyle = styles.completed;
                statusText = 'Tamamlandı';
                statusIcon = require('../assets/odendi.png');
                break;
            case 'pasif':
                statusStyle = styles.passive;
                statusText = 'Pasif';
                statusIcon = require('../assets/basarisiz.png');
                break;
            case 'aktif':
            default:
                statusStyle = styles.active;
                statusText = 'Aktif';
                statusIcon = require('../assets/odendi.png');
                break;
        }

        return (
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.username}>{item.customerName.substring(0, 15)}</Text>
                    <Text style={styles.infoText}>Tutar: {item.amount}</Text>
                    <Text style={styles.infoText}>Telefon: {item.customerPhone}</Text>
                    <Text style={styles.infoText}>Tarih: {formatDateTime(item.createdAt)}</Text>
                </View>

                <View style={[styles.statusBox, statusStyle]}>
                    <Image source={statusIcon} style={styles.statusIcon} />
                    <Text style={styles.statusText}>{statusText}</Text>
                </View>

                <TouchableOpacity style={styles.menuTouchable} onPress={() => setShowMenuFor(item.uuid)}>
                    <Image source={require('../assets/statusmenu.png')} style={styles.menuIcon} />
                </TouchableOpacity>

                {showMenuFor === item.uuid && item.status !== 'tamamlandi' && (
                    <View style={styles.menu}>
                        <Text style={styles.menuItem} onPress={() => handleCopyLink(item.uuid)}>
                            Kopyala
                        </Text>
                        {item.status !== 'pasif' && (
                            <Text style={styles.menuItem} onPress={() => handleStatusChange(item.uuid, 'pasif')}>
                                Pasif Et
                            </Text>
                        )}
                        {item.status !== 'tamamlandi' && (
                            <Text style={styles.menuItem} onPress={() => handleStatusChange(item.uuid, 'tamamlandi')}>
                                Tamamlandı
                            </Text>
                        )}
                        {item.status === 'pasif' && (
                            <Text style={styles.menuItem} onPress={() => handleStatusChange(item.uuid, 'aktif')}>
                                Aktif Et
                            </Text>
                        )}
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Ödeme Link Listesi" />

            <View style={styles.headerImageWrapper}>
                <Image source={require('../assets/LinkList.png')} style={styles.headerImage} />
                <Text style={styles.headerText}>Ödeme Linkleri</Text>
            </View>

            {links.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: hp('4%') }}>
                    <Image source={require('../assets/nolink.png')} style={{ width: wp('40%'), height: wp('40%') }} />
                    <Text style={styles.emptyText}>Henüz oluşturulmuş bir ödeme linkiniz bulunmamaktadır.</Text>
                </View>
            ) : (
                <FlatList
                    data={links}
                    renderItem={renderLinkItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: hp('15%'), paddingHorizontal: wp('3%') }}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    headerImageWrapper: {
        alignItems: 'center',
        marginTop: hp('3%'),
    },
    headerImage: {
        width: wp('25%'),
        height: wp('25%'),
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: wp('7%'),
        color: '#0F5A2D',
        fontWeight: '700',
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
    },
    emptyText: {
        fontSize: wp('4%'),
        color: '#838383',
        marginTop: hp('2%'),
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#0F5A2D',
        borderRadius: 20,
        width: wp('92%'),
        height: hp('14%'),
        padding: wp('4%'),
        marginBottom: hp('2%'),
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    cardContent: {
        flex: 1,
    },
    username: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#000',
    },
    infoText: {
        fontSize: wp('4%'),
        color: '#5F5F5F',
        marginTop: hp('0.3%'),
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.8%'),
        borderRadius: 20,
        height: hp('5%'),
        width: wp('35%'),
        justifyContent: 'center',
    },
    statusIcon: {
        width: wp('5.5%'),
        height: wp('5.5%'),
        marginRight: wp('2%'),
        resizeMode: 'contain',
    },
    statusText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: wp('4%'),
    },
    active: {
        backgroundColor: '#0F5A2D',
    },
    passive: {
        backgroundColor: '#981515',
    },
    completed: {
        backgroundColor: '#0F5A2D',
    },
    menuTouchable: {
        position: 'absolute',
        top: hp('1%'),
        right: wp('2.5%'),
        zIndex: 2,
    },
    menuIcon: {
        width: wp('6%'),
        height: wp('6%'),
    },
    menu: {
        position: 'absolute',
        top: hp('5%'),
        right: wp('2.5%'),
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: wp('3%'),
        elevation: 5,
        zIndex: 3,
    },
    menuItem: {
        paddingVertical: hp('0.8%'),
        color: '#0F5A2D',
        fontWeight: 'bold',
        fontSize: wp('4%'),
    },
});
