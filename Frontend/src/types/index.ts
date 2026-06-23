export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    brand: string;
    ram: string;
    cpu: string;
    storage: string;
    imageUrl: string;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    totalPrice: number;
    createdAt: string;
    orderItems: OrderItem[];
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}
