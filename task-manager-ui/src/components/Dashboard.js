import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        ApiService.getProjects().then(res => setProjects(res.data));
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Welcome, {user.name} ({user.role})</h2>
                <button className="btn btn-danger btn-sm" onClick={() => { localStorage.clear(); window.location.href="/"; }}>Logout</button>
            </div>

            {user.role === 'ADMIN' && (
                <div className="card p-3 mb-4 bg-light">
                    <h4>Admin Actions</h4>
                    <button className="btn btn-success w-25">Create New Project</button>
                </div>
            )}

            <h4>Projects Overview</h4>
            <div className="row">
                {projects.map(p => (
                    <div key={p.id} className="col-md-4 mb-3">
                        <div className="card shadow-sm h-100 p-3">
                            <h5>{p.name}</h5>
                            <p className="text-muted small">{p.description}</p>
                            <button className="btn btn-outline-primary btn-sm mt-auto">View Tasks</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;