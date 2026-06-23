import api from './api';
import type { Order } from '../types';

export const placeOrder = async () => {
    const response = await api.post<Order>('/orders');
    return response.data;
};

export const getUserOrders = async () => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
};
