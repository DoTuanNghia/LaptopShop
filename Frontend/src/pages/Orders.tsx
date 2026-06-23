import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../services/order.service';
import type { Order } from '../types';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getUserOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <div className="container" style={{ marginTop: '30px' }}>Loading orders...</div>;

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <h1 className="page-title">Order History</h1>

            {orders.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
                    <h3>You have no orders</h3>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px' }}>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>Order #{order.id}</span>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        Placed on: {new Date(order.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                    ${order.totalPrice.toLocaleString()}
                                </div>
                            </div>

                            <div>
                                {order.orderItems?.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div>
                                            <span>{item.product?.name}</span>
                                            <span style={{ color: 'var(--text-secondary)', marginLeft: '10px' }}>x{item.quantity}</span>
                                        </div>
                                        <div>${(item.price * item.quantity).toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
