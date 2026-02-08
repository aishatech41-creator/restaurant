import api from '../api/axios';

export const authService = {
    register: async (userData) => {
        const response = await api.post('/register', userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    update: async (userData) => {
        // Only send necessary fields
        const payload = {
            name: userData.displayName || userData.name,
            phone: userData.phoneNumber || userData.phone,
            photo_url: userData.photoURL
        };
        const response = await api.post('/update', payload);
        return response.data;
    },
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: async () => {
        await api.post('/logout');
        localStorage.removeItem('user');
    }
};
