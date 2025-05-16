import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.0.13:3000';

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Giriş başarısız');

        await AsyncStorage.setItem('token', data.token);
        if (data.user) {
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// Kullanıcıyı getirme
export const getUserProfile = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token bulunamadı');

        const response = await fetch(`${BASE_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Profil verisi alınamadı');

        return data;
    } catch (error) {
        throw error;
    }
};

export const updatePassword = async (oldPassword, newPassword, newPasswordRepeat) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token bulunamadı');

    const response = await fetch(`${BASE_URL}/auth/update-password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword, newPasswordRepeat }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Şifre güncelleme başarısız');

    return data;
};

