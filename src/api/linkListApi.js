
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.0.13:3000';

export const getAllLinks = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token alınamadı. Lütfen tekrar giriş yapın.');

    const response = await fetch(`${BASE_URL}/link`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Linkler getirilemedi');

    return data;
};
export const updateLinkStatus = async (uuid, newStatus) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token alınamadı. Lütfen tekrar giriş yapın.');

    const response = await fetch(`${BASE_URL}/link/${uuid}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Durum güncellenemedi');

    return data;
};
export const getSuccessfulLinks = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token alınamadı. Lütfen tekrar giriş yapın.');

    const response = await fetch(`${BASE_URL}/link`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Linkler getirilemedi');

    return data.filter(link => link.paymentCase === 'success');
};



