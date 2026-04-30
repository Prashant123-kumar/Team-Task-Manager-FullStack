import React, { useState } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        ApiService.login({ email, password }).then(res => {
            if (res.data.id) {
                localStorage.setItem('user', JSON.stringify(res.data));
                alert("Login Successful!");
                navigate('/dashboard');
            } else {
                alert("Invalid Credentials");
            }
        }).catch(err => alert("Login Failed: " + err));
    };

    return (
        <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
                <input type="email" className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                <button className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;