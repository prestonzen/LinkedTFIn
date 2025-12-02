import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register attempt', { email, password, name });
        // TODO: Implement actual register logic
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
                    <h1>Make the most of your professional life</h1>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label htmlFor="name">Full Name</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password (6+ characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Password (6+ characters)</label>
                        </div>

                        <p className="terms-text">
                            By clicking Agree & Join, you agree to the LinkedTFIn <Link to="/terms">User Agreement</Link>, <Link to="/privacy">Privacy Policy</Link>, and <Link to="/cookies">Cookie Policy</Link>.
                        </p>

                        <button type="submit" className="btn btn-primary btn-block btn-large">
                            Agree & Join
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <p className="auth-footer-text">
                        Already on LinkedTFIn? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
