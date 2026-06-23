import api from './api';
import type { CartItem } from '../types';

export const getCartItems = async () => {
    const response = await api.get<CartItem[]>('/cart');
    return response.data;
};

export const addToCart = async (productId: number, quantity: number) => {
    const response = await api.post<CartItem>('/cart/add', {
        product: { id: productId },
        quantity
    });
    return response.data;
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
    const response = await api.put<CartItem>('/cart/update', {
        id: cartItemId,
        quantity
    });
    return response.data;
};

export const removeCartItem = async (cartItemId: number) => {
    const response = await api.delete(`/cart/remove/${cartItemId}`);
    return response.data;
};
