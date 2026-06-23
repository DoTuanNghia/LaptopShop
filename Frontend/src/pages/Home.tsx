import React, { useState, useEffect } from 'react';
import { getProducts, searchProducts, filterProducts } from '../services/product.service';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [keyword, setKeyword] = useState('');
    const [brand, setBrand] = useState('');
    const [ram, setRam] = useState('');
    const [cpu] = useState('');
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts(0, 50);
            setProducts(data.content);
        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (keyword.trim() === '') {
                loadProducts();
            } else {
                const data = await searchProducts(keyword, 0, 50);
                setProducts(data.content);
            }
        } catch (error) {
            console.error('Failed to search', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = async () => {
        try {
            setLoading(true);
            const data = await filterProducts(brand, ram, cpu, 0, 50);
            setProducts(data.content);
        } catch (error) {
            console.error('Failed to filter', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="container">
            <div className="page-header" style={{ marginTop: '30px' }}>
                <h1 className="page-title">Find Your Perfect Laptop</h1>
            </div>

            <div className="filters-bar">
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        className="form-control filter-select"
                        placeholder="Search keywords..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>

                <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                    <select className="form-control filter-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="">All Brands</option>
                        <option value="Apple">Apple</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                    </select>
                    <select className="form-control filter-select" value={ram} onChange={(e) => setRam(e.target.value)}>
                        <option value="">All RAM</option>
                        <option value="8GB">8GB</option>
                        <option value="16GB">16GB</option>
                        <option value="32GB">32GB</option>
                    </select>
                    <button onClick={handleFilter} className="btn btn-outline">Apply Filters</button>
                </div>
            </div>

            {loading ? (
                <div>Loading products...</div>
            ) : (
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                            <h3>No products found.</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
