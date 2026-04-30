import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const STATUS_COLORS = {
    TODO:        'secondary',
    IN_PROGRESS: 'primary',
    DONE:        'success',
    OVERDUE:     'danger',
};

const Dashboard = () => {
    const [projects,    setProjects]    = useState([]);
    const [tasks,       setTasks]       = useState([]);
    const [newProject,  setNewProject]  = useState({ name: '', description: '' });
    const [showForm,    setShowForm]    = useState(false);
    const [activeTab,   setActiveTab]   = useState('projects');

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        ApiService.getProjects().then(res => setProjects(res.data));
        ApiService.getUserTasks(user.id).then(res => setTasks(res.data));
    };

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
                    <h4 className="mb-0">Welcome, <strong>{user.name}</strong></h4>
                    <span className={`badge bg-${user.role === 'ADMIN' ? 'danger' : 'primary'}`}>
                        {user.role}
                    </span>
                </div>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                >
                    Logout
                </button>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2 className="text-primary mb-0">{projects.length}</h2>
                        <small className="text-muted">Total Projects</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2 className="text-secondary mb-0">
                            {tasks.filter(t => t.status === 'TODO').length}
                        </h2>
                        <small className="text-muted">To Do</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2 className="text-success mb-0">
                            {tasks.filter(t => t.status === 'DONE').length}
                        </h2>
                        <small className="text-muted">Done</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center p-3 shadow-sm">
                        <h2 className="text-danger mb-0">{overdueTasks.length}</h2>
                        <small className="text-muted">Overdue</small>
                    </div>
                </div>
            </div>

            {/* Overdue Alert */}
            {overdueTasks.length > 0 && (
                <div className="alert alert-danger">
                    <strong>⚠ Overdue Tasks:</strong>{' '}
                    {overdueTasks.map(t => t.title).join(', ')}
                </div>
            )}

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

            {/* Projects Tab */}
            {activeTab === 'projects' && (
                <div>
                    {user.role === 'ADMIN' && (
                        <div className="mb-3">
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => setShowForm(!showForm)}
                            >
                                {showForm ? 'Cancel' : '+ New Project'}
                            </button>

                            {showForm && (
                                <form
                                    onSubmit={handleCreateProject}
                                    className="card p-3 mt-3 bg-light"
                                >
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Project Name"
                                        value={newProject.name}
                                        onChange={e =>
                                            setNewProject({ ...newProject, name: e.target.value })
                                        }
                                        required
                                    />
                                    <textarea
                                        className="form-control mb-2"
                                        placeholder="Description"
                                        rows={2}
                                        value={newProject.description}
                                        onChange={e =>
                                            setNewProject({ ...newProject, description: e.target.value })
                                        }
                                    />
                                    <button className="btn btn-primary btn-sm w-25">Create</button>
                                </form>
                            )}
                        </div>
                    )}

                    <div className="row">
                        {projects.map(p => (
                            <div key={p.id} className="col-md-4 mb-3">
                                <div className="card shadow-sm h-100 p-3">
                                    <h5>{p.name}</h5>
                                    <p className="text-muted small">{p.description}</p>
                                    <div className="mt-auto d-flex gap-2">
                                        <button className="btn btn-outline-primary btn-sm">
                                            View Tasks
                                        </button>
                                        {user.role === 'ADMIN' && (
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleDeleteProject(p.id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* My Tasks Tab */}
            {activeTab === 'tasks' && (
                <div>
                    {tasks.length === 0 ? (
                        <p className="text-muted">No tasks assigned to you.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Title</th>
                                        <th>Project</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(t => (
                                        <tr key={t.id}>
                                            <td>{t.title}</td>
                                            <td>{t.project?.name || '—'}</td>
                                            <td>{t.dueDate || '—'}</td>
                                            <td>
                                                <span
                                                    className={`badge bg-${STATUS_COLORS[t.status] || 'secondary'}`}
                                                >
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td>
                                                <select
                                                    className="form-select form-select-sm d-inline w-auto me-2"
                                                    value={t.status}
                                                    onChange={e =>
                                                        handleStatusChange(t.id, e.target.value)
                                                    }
                                                >
                                                    <option value="TODO">TODO</option>
                                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                                    <option value="DONE">DONE</option>
                                                </select>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDeleteTask(t.id)}
                                                >
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;