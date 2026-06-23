import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCartItems, updateCartItem, removeCartItem } from '../services/cart.service';
import { placeOrder } from '../services/order.service';
import type { CartItem } from '../types';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [checkingOut, setCheckingOut] = useState(false);
    const navigate = useNavigate();

    const loadCart = async () => {
        try {
            setLoading(true);
            const items = await getCartItems();
            setCartItems(items);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleUpdateQuantity = async (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            await updateCartItem(id, newQuantity);
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = async (id: number) => {
        try {
            await removeCartItem(id);
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        try {
            setCheckingOut(true);
            await placeOrder();
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error(error);
            alert('Checkout failed');
        } finally {
            setCheckingOut(false);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (loading) return <div className="container" style={{ marginTop: '30px' }}>Loading cart...</div>;

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <h1 className="page-title">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
                    <h3>Your cart is empty</h3>
                    <p style={{ marginTop: '10px', marginBottom: '20px', color: 'var(--text-secondary)' }}>Looks like you haven't added any laptops to your cart yet.</p>
                    <Link to="/" className="btn btn-primary">Start Shopping</Link>
                </div>
            ) : (
                <div className="layout-2col">
                    <div className="card" style={{ padding: '0' }}>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.product.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200'}
                                    alt={item.product.name}
                                    className="cart-item-img"
                                />
                                <div className="cart-item-info">
                                    <h3 className="cart-item-title">
                                        <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                                    </h3>
                                    <div className="cart-item-price">${item.product.price.toLocaleString()}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="quantity-control">
                                        <button className="quantity-btn" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button className="quantity-btn" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="btn btn-danger" style={{ padding: '8px 12px' }} onClick={() => handleRemove(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="cart-summary">
                            <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
                            <div className="summary-row">
                                <span>Items ({cartItems.length}):</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row summary-total">
                                <span>Total:</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', marginTop: '20px', padding: '15px' }}
                                onClick={handleCheckout}
                                disabled={checkingOut}
                            >
                                {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
