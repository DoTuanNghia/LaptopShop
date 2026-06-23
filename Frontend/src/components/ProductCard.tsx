import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Dummy image if imageUrl is empty
    const imgUrl = product.imageUrl || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400';

    return (
        <div className="product-card">
            <img src={imgUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">${product.price.toLocaleString()}</div>
                
                <div className="product-specs">
                    <span className="spec-badge">{product.brand}</span>
                    {product.ram && <span className="spec-badge">{product.ram}</span>}
                    {product.cpu && <span className="spec-badge">{product.cpu}</span>}
                </div>
                
                <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
