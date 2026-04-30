import React, { useState } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,    setEmail]    = useState('');
    const [password, setPassword] = useState('');
    const [error,    setError]    = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        ApiService.login({ email, password })
            .then(res => {
                if (res.data.id) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate('/dashboard');
                } else {
                    setError("Invalid credentials. Please try again.");
                }
            })
            .catch(() => setError("Login failed. Check your credentials."));
    };

    return (
        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Login</h3>

            {error && (
                <div className="alert alert-danger py-2">{error}</div>
            )}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className="btn btn-primary w-100">Login</button>
            </form>

            <p className="text-center mt-3 mb-0 small">
                Don't have an account?{' '}
                <a href="/signup" className="text-primary">Sign Up</a>
            </p>
        </div>
    );
};

export default Login;