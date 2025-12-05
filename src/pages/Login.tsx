import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            navigate('/profile');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-page">
            <header className="auth-header">
                <Link to="/" className="auth-logo">
                    Linked<span className="logo-highlight">TF</span>In
                </Link>
            </header>

            <div className="auth-container">
                <div className="auth-card">
                    <h1>Sign in</h1>
                    <p className="auth-subtitle">Stay updated on your professional world</p>
                    {error && <div style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email or Phone"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Email or Phone</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>

                        <button type="submit" className="btn btn-primary btn-block btn-large">
                            Sign in
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <p className="auth-footer-text">
                        New to LinkedTFIn? <Link to="/register">Join now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
