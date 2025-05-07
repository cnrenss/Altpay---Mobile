import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:3000';

export const createPaymentLink = async (customerName, amount, description,createdAt) => {
    const token = await AsyncStorage.getItem('token'); // Login'den sonra kaydedilmiş olmalı
    console.log('token:', token);

    const response = await fetch(`${BASE_URL}/links`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({ customerName, amount, description,createdAt }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Link oluşturulamadı');
    return data;
};
