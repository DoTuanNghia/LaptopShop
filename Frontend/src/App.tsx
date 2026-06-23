import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import { getCurrentUser } from './services/auth.service';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = getCurrentUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <main style={{ flexGrow: 1, paddingBottom: '50px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                            path="/cart" 
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/orders" 
                            element={
                                <ProtectedRoute>
                                    <Orders />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </main>
                <footer style={{ background: 'var(--secondary-color)', color: 'white', textAlign: 'center', padding: '20px', marginTop: 'auto' }}>
                    &copy; {new Date().getFullYear()} LaptopShop. All rights reserved.
                </footer>
            </div>
        </Router>
    );
};

export default App;
