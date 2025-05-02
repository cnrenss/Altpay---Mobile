import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        width: 405,
        height: 70,

        backgroundColor: '#E9E9E9',
        borderWidth: 1,
        borderColor: '#0F5A2D',
        borderRadius: 16,
        marginBottom: 16,
        paddingHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    date: {
        fontSize: 20,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 0.73)',
    },
    amount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F5A2D',
    },
});

export default TransactionCard;
