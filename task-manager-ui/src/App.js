import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <div className="container mt-5">
                <nav className="navbar navbar-dark bg-dark mb-4 p-2 rounded shadow-sm">
                    <span className="navbar-brand mb-0 h1">Team Task Manager</span>
                </nav>
                <Routes>
                    <Route path="/"          element={<Login />} />
                    <Route path="/signup"    element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;