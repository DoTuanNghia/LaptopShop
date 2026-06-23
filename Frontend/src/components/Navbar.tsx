import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth.service';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">LaptopShop</Link>
                
                <div className="navbar-links">
                    <Link to="/">Products</Link>
                    {user ? (
                        <>
                            <Link to="/cart">Cart</Link>
                            <Link to="/orders">Orders</Link>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                                Hi, {user.username}
                            </span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline" style={{ padding: '6px 12px' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '6px 12px' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
