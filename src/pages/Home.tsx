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

            <main className="container home-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 'calc(100vh - 140px)', padding: '40px 0' }}>
                <div style={{ maxWidth: '500px', textAlign: 'left' }}>
                    <h1 style={{ fontSize: '56px', fontWeight: '200', color: 'var(--color-brand)', marginBottom: '32px', lineHeight: '1.2' }}>
                        Welcome to your professional community
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                        <Link to="/login" className="btn btn-outline btn-large btn-block">
                            Sign in with email
                        </Link>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
                            New to LinkedTFIn? <Link to="/register">Join now</Link>
                        </p>
                    </div>
                </div>
                <div className="hero-image" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '600px', height: '400px', background: 'linear-gradient(135deg, #eef3f8 0%, #dde7f1 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a66c2', flexDirection: 'column' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: '500' }}>Connect with professionals</p>
                    </div>
                </div>
            </main>

            <footer style={{ padding: '24px', textAlign: 'center', backgroundColor: '#f3f2ef', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <p><strong>Disclaimer:</strong> This is a portfolio project created by Preston Zen. It is a clone of LinkedIn created for educational and demonstration purposes only. It is not affiliated with, endorsed by, or connected to LinkedIn Corporation. This site was created because my original account was restricted.</p>
                <p style={{ marginTop: '8px' }}>&copy; {new Date().getFullYear()} LinkedTFIn</p>
            </footer>
        </div>
    );
};

export default Home;
