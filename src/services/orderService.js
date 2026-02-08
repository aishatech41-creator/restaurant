import api from '../api/axios';

export const orderService = {
    // Save new order
    save: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    // Get all orders (Admin)
    getAll: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    // Update order status
    updateStatus: async (id, status) => {
        const response = await api.put(`/orders/${id}`, { payment_status: status });
        return response.data;
    }
};
