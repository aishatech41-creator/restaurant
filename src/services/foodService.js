import api from '../api/axios';

export const foodService = {
    getAll: async () => {
        const response = await api.get('/food');
        return response.data;
    },
    save: async (foodData) => {
        const response = await api.post('/food', foodData);
        return response.data;
    },
    update: async (id, foodData) => {
        const response = await api.post(`/food/update/${id}`, foodData);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/food/${id}`);
        return response.data;
    },
    uploadImage: async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.url; // Assuming backend returns { url: ... }
    }
};
