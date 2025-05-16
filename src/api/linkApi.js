import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.0.13:3000';

export const createPaymentLink = async (customerName,customerPhone, amount, description,createdAt,updatedAt) => {
    const token = await AsyncStorage.getItem('token');
    console.log('token:', token);

    const response = await fetch(`${BASE_URL}/link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({ customerName, customerPhone,amount, description,createdAt,updatedAt }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Link oluşturulamadı');
    return data;
};
