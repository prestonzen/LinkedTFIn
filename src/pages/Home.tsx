import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const Home: React.FC = () => {
    return (
        <div className="auth-page">
            <header className="auth-header">
                <Link to="/" className="auth-logo">
                    Linked<span className="logo-highlight">TF</span>In
                </Link>
                <div className="auth-actions">
                    <Link to="/register" className="btn btn-outline" style={{ marginRight: '12px' }}>Join now</Link>
                    <Link to="/login" className="btn btn-outline">Sign in</Link>
                </div>
            </header>

            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '200', color: 'var(--color-brand)', marginBottom: '24px' }}>
                        Welcome to your professional community
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
                        <Link to="/login" className="btn btn-outline btn-large btn-block">
                            Sign in with email
                        </Link>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
                            New to LinkedTFIn? <Link to="/register">Join now</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
