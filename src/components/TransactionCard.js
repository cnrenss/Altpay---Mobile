import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TransactionCard = ({ name, date, amount }) => {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={styles.amount}>{amount} TL</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp('90%'),
        height: hp('9%'),
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#0F5A2D',
        borderRadius: wp('4%'),
        marginBottom: hp('2%'),
        paddingHorizontal: wp('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    name: {
        fontSize: wp('5%'),
        fontWeight: '600',
        color: '#000',
    },
    date: {
        fontSize: wp('4%'),
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.73)',
        marginTop: hp('0.5%'),
    },
    amount: {
        fontSize: wp('5%'),
        fontWeight: '700',
        color: '#0F5A2D',
    },
});

export default TransactionCard;
