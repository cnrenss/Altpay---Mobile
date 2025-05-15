import React, { useEffect, useState,  } from 'react';
import {View,  Text, StyleSheet, Image, FlatList, TouchableOpacity, } from 'react-native';
import Header from '../components/Header';
import BottomPanel from '../components/BottomPanel';
import { getAllLinks, updateLinkStatus } from '../api/linkListApi';
import Clipboard from '@react-native-clipboard/clipboard';



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
        const turkishTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);

        const formattedDate = turkishTime.toLocaleDateString('tr-TR');
        const formattedTime = turkishTime.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDate} - ${formattedTime}`;
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
        let statusColor, statusText, statusIcon;

        switch (item.status) {
            case 'tamamlandi':
                statusColor = styles.completed;
                statusText = 'Tamamlandı';
                statusIcon = require('../assets/odendi.png');
                break;
            case 'pasif':
                statusColor = styles.passive;
                statusText = 'Pasif';
                statusIcon = require('../assets/basarisiz.png');
                break;
            case 'aktif':
            default:
                statusColor = styles.active;
                statusText = 'Aktif';
                statusIcon = require('../assets/odendi.png');
                break;
        }

        return (

            <View style={styles.card}>

                <View style={styles.cardContent}>


                    <Text style={styles.username}>{item.customerName.substring(0,15)}</Text>
                    <Text style={styles.amount}>Tutar: {item.amount}</Text>
                    <Text style={styles.customerPhone}>Telefon: {item.customerPhone}</Text>
                    <Text style={styles.date}>Tarih: {formatDateTime(item.createdAt)}</Text>

                </View>

                <View style={[styles.statusBox, statusColor]}>
                    <Image source={statusIcon} style={styles.statusIcon} />
                    <Text
                        style={[styles.statusText, item.status === 'tamamlandi' && { fontSize: 17 }
                        ]}
                    >
                        {statusText}
                    </Text>
                </View>
                <TouchableOpacity style={styles.menuTouchable} onPress={() => setShowMenuFor(item.uuid)}>
                    <Image source={require('../assets/statusmenu.png')} style={styles.menuIcon} />
                </TouchableOpacity>







                {showMenuFor === item.uuid && item.status !== 'tamamlandi' && (
                    <View style={styles.menu}>
                        <Text
                            style={styles.menuItem}
                            onPress={() => {
                                handleCopyLink(item.uuid);
                                setShowMenuFor(null);
                            }}
                        >
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
            <Header
                title="Ödeme Link Listesi"
                onMenuPress={() => console.log('Menü')}
                onAvatarPress={() => console.log('Avatar')}
            />

            <View style={styles.imagewrapper}>
                <Image style={styles.anaimage} source={require('../assets/LinkList.png')} />
                <Text style={styles.baslik}>Ödeme Linkleri</Text>
            </View>

            {links.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image style={{ marginTop: 50 }} source={require('../assets/nolink.png')} />
                    <Text style={styles.emptyText}>
                        Henüz oluşturulmuş bir ödeme linkiniz bulunmamaktadır.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={links}
                    renderItem={renderLinkItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 10 }}
                    keyboardShouldPersistTaps="handled"
                />
            )}

        </View>

);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuTouchable: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        zIndex: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },



    statusIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
    imagewrapper: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    anaimage: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    baslik: {
        marginTop: 10,
        fontSize: 32,
        color: '#0F5A2D',
        fontWeight: '700',
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#838383',
        marginTop: 25,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#0F5A2D',
        borderRadius: 20,
        width: 394,
        height: 140,
        padding: 15,
        paddingRight: 20,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        position: 'relative',
    },

    cardContent: {
        flex: 1,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },

    amount: {
        fontSize: 18,
        color: '#5F5F5F',
        marginTop: 10,
    },
    customerPhone: {
        fontSize: 18,
        color: '#5F5F5F',
        marginTop: 5,
    },
    date: {
        fontSize: 17,
        color: '#5F5F5F',
        marginTop: 5,
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        width: 156,
        height: 40,
        position: 'relative',
        paddingHorizontal: 14,
        justifyContent: 'center',
        borderRadius: 20,
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
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
    menuIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },

    menu: {
        position: 'absolute',
        top: 40,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        zIndex: 99,
    },


    menuItem: {
        paddingVertical: 6,
        color: '#0F5A2D',
        fontWeight: 'bold',
    },
});
