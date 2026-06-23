import api from './api';
import type { Product, PaginatedResponse } from '../types';

export const getProducts = async (page = 0, size = 10) => {
    const response = await api.get<PaginatedResponse<Product>>(`/products?page=${page}&size=${size}`);
    return response.data;
};

export const getProductById = async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

export const searchProducts = async (keyword: string, page = 0, size = 10) => {
    const response = await api.get<PaginatedResponse<Product>>(`/products/search?keyword=${keyword}&page=${page}&size=${size}`);
    return response.data;
};

export const filterProducts = async (brand?: string, ram?: string, cpu?: string, page = 0, size = 10) => {
    let query = `/products/filter?page=${page}&size=${size}`;
    if (brand) query += `&brand=${brand}`;
    if (ram) query += `&ram=${ram}`;
    if (cpu) query += `&cpu=${cpu}`;
    const response = await api.get<PaginatedResponse<Product>>(query);
    return response.data;
};
