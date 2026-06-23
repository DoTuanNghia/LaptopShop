import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/product.service';
import { addToCart } from '../services/cart.service';
import { getCurrentUser } from '../services/auth.service';
import type { Product } from '../types';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        if (id) {
            getProductById(Number(id))
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleAddToCart = async () => {
        if (!getCurrentUser()) {
            navigate('/login');
            return;
        }

        if (product) {
            setAddingToCart(true);
            try {
                await addToCart(product.id, quantity);
                alert('Added to cart successfully!');
                navigate('/cart');
            } catch (error) {
                console.error(error);
                alert('Failed to add to cart');
            } finally {
                setAddingToCart(false);
            }
        }
    };

    if (loading) return <div className="container" style={{ marginTop: '30px' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ marginTop: '30px' }}>Product not found</div>;

    const imgUrl = product.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800';

    return (
        <div className="container" style={{ marginTop: '40px', marginBottom: '40px' }}>
            <div className="layout-2col">
                <div>
                    <img src={imgUrl} alt={product.name} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                </div>
                <div>
                    <h1 className="page-title" style={{ marginBottom: '10px' }}>{product.name}</h1>
                    <div className="product-price" style={{ fontSize: '2rem', marginBottom: '20px' }}>
                        ${product.price.toLocaleString()}
                    </div>

                    <div className="card" style={{ marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Specifications</h3>
                        <ul style={{ display: 'grid', gap: '10px' }}>
                            <li><strong>Brand:</strong> {product.brand}</li>
                            <li><strong>CPU:</strong> {product.cpu}</li>
                            <li><strong>RAM:</strong> {product.ram}</li>
                            <li><strong>Storage:</strong> {product.storage}</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Description</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div className="quantity-control">
                            <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', width: '30px', textAlign: 'center' }}>{quantity}</span>
                            <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button
                            className="btn btn-primary"
                            style={{ flexGrow: 1, padding: '15px' }}
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                        >
                            {addingToCart ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
