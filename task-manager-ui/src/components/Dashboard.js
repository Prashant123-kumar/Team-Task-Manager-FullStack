import React, { useEffect, useState, useCallback } from 'react';
import ApiService from '../services/ApiService';

const STATUS_COLORS = {
    TODO: 'secondary',
    IN_PROGRESS: 'primary',
    DONE: 'success',
    OVERDUE: 'danger',
};

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('projects');

    const user = JSON.parse(localStorage.getItem('user'));

    // ✅ FIXED with useCallback
    const loadData = useCallback(() => {
        if (!user) return;

        ApiService.getProjects().then(res => setProjects(res.data));
        ApiService.getUserTasks(user.id).then(res => setTasks(res.data));
    }, [user]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCreateProject = (e) => {
        e.preventDefault();
        const payload = { ...newProject, createdBy: { id: user.id } };

        ApiService.createProject(payload).then(() => {
            setNewProject({ name: '', description: '' });
            setShowForm(false);
            loadData();
        });
    };

    const handleStatusChange = (taskId, status) => {
        ApiService.updateTaskStatus(taskId, status).then(loadData);
    };

    const handleDeleteTask = (taskId) => {
        if (window.confirm("Delete this task?")) {
            ApiService.deleteTask(taskId).then(loadData);
        }
    };

    const handleDeleteProject = (projectId) => {
        if (window.confirm("Delete this project and all its tasks?")) {
            ApiService.deleteProject(projectId).then(loadData);
        }
    };

    const overdueTasks = tasks.filter(t => t.status === 'OVERDUE');

    return (
        <div className="container">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4>Welcome, <strong>{user?.name}</strong></h4>
                    <span className={`badge bg-${user?.role === 'ADMIN' ? 'danger' : 'primary'}`}>
                        {user?.role}
                    </span>
                </div>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                >
                    Logout
                </button>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2>{projects.length}</h2>
                        <small>Total Projects</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2>{tasks.filter(t => t.status === 'TODO').length}</h2>
                        <small>To Do</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2>{tasks.filter(t => t.status === 'DONE').length}</h2>
                        <small>Done</small>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2>{overdueTasks.length}</h2>
                        <small>Overdue</small>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        Projects
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        My Tasks
                    </button>
                </li>
            </ul>

            {/* Projects */}
            {activeTab === 'projects' && (
                <div>
                    <button
                        className="btn btn-success btn-sm mb-3"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : '+ New Project'}
                    </button>

                    {showForm && (
                        <form onSubmit={handleCreateProject}>
                            <input
                                className="form-control mb-2"
                                placeholder="Project Name"
                                value={newProject.name}
                                onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                                required
                            />
                            <textarea
                                className="form-control mb-2"
                                placeholder="Description"
                                value={newProject.description}
                                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                            />
                            <button className="btn btn-primary btn-sm">Create</button>
                        </form>
                    )}

                    <div className="row mt-3">
                        {projects.map(p => (
                            <div key={p.id} className="col-md-4 mb-3">
                                <div className="card p-3">
                                    <h5>{p.name}</h5>
                                    <p>{p.description}</p>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteProject(p.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tasks */}
            {activeTab === 'tasks' && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(t => (
                            <tr key={t.id}>
                                <td>{t.title}</td>
                                <td>{t.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;