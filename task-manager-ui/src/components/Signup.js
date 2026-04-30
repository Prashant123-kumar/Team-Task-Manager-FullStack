import React, { useState } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form,  setForm]  = useState({ name: '', email: '', password: '', role: 'MEMBER' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');
        ApiService.signup(form)
            .then(() => {
                alert("Registration successful! Please login.");
                navigate('/');
            })
            .catch(err => {
                setError(err.response?.data || "Signup failed. Try again.");
            });
    };

    return (
        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Create Account</h3>

            {error && (
                <div className="alert alert-danger py-2">{error}</div>
            )}

            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    className="form-select mb-3"
                    onChange={handleChange}
                    value={form.role}
                >
                    <option value="MEMBER">Member</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button className="btn btn-success w-100">Sign Up</button>
            </form>

            <p className="text-center mt-3 mb-0 small">
                Already have an account?{' '}
                <a href="/" className="text-primary">Login</a>
            </p>
        </div>
    );
};

export default Signup;