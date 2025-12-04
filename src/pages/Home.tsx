import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import './Home.css';

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

            <main className="container home-main">
                <div className="home-content">
                    <h1 className="home-title">
                        Welcome to your professional community
                    </h1>
                    <div className="home-actions">
                        <Link to="/login" className="btn btn-outline btn-large btn-block">
                            Sign in with email
                        </Link>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
                            New to LinkedTFIn? <Link to="/register">Join now</Link>
                        </p>
                    </div>
                </div>
                <div className="home-hero">
                    <div className="hero-graphic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <p className="hero-text">Connect with professionals</p>
                    </div>
                </div>
            </main>

            <footer className="home-footer">
                <p><strong>Disclaimer:</strong> This is a portfolio project created by Preston Zen. It is a clone of LinkedIn created for educational and demonstration purposes only. It is not affiliated with, endorsed by, or connected to LinkedIn Corporation. This site was created because my original account was restricted.</p>
                <p style={{ marginTop: '8px' }}>&copy; {new Date().getFullYear()} LinkedTFIn</p>
            </footer>
        </div>
    );
};

export default Home;
