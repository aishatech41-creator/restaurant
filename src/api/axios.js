import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor to add token to requests
api.interceptors.request.use(config => {
    const user = localStorage.getItem('user');
    if (user) {
        const token = JSON.parse(user).token; // Assuming we store object with token
        if (token) {
            // console.log("Attaching token:", token);
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No token found in stored user object:", user);
        }
    } else {
        // console.warn("No user found in localStorage"); // Silencing verbose warning
    }
    return config;
});

export default api;
