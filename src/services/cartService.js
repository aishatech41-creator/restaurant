import api from '../api/axios';

export const cartService = {
    getAll: async () => {
        const response = await api.get('/cart');
        return response.data;
    },
    add: async (item) => {
        // Backend expects { food_id, qty }
        const payload = {
            food_id: item.fid || item.food_id || item.id,
            qty: item.qty || 1
        };
        const response = await api.post('/cart', payload);
        return response.data;
    },
    remove: async (id) => {
        // id here should be the cart_item id, NOT food_id. 
        // Note: Frontend likely tracks food items. We might need to adjust logic based on what ID is passed.
        const response = await api.delete(`/cart/${id}`);
        return response.data;
    },
    clear: async () => {
        const response = await api.delete('/cart');
        return response.data;
    }
};
