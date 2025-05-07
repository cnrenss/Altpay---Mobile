import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:3000';

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
            await AsyncStorage.setItem('user', JSON.stringify(data.user)); // kullanıcı bilgisi varsa sakla
        }

        return data;
    } catch (error) {
        throw error;
    }
};
