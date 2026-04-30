import axios from 'axios';

const API_URL = "https://team-task-manager-fullstack-2.onrender.com/api";

class ApiService {

    // Auth
    signup(user) {
        return axios.post(`${API_URL}/auth/signup`, user);
    }

    login(user) {
        return axios.post(`${API_URL}/auth/login`, user);
    }

    // Projects
    getProjects() {
        return axios.get(`${API_URL}/projects/all`);
    }

    getMyProjects(userId) {
        return axios.get(`${API_URL}/projects/my/${userId}`);
    }

    createProject(project) {
        return axios.post(`${API_URL}/projects/create`, project);
    }

    deleteProject(id) {
        return axios.delete(`${API_URL}/projects/${id}`);
    }

    // Tasks
    assignTask(task) {
        return axios.post(`${API_URL}/tasks/assign`, task);
    }

    getUserTasks(userId) {
        return axios.get(`${API_URL}/tasks/user/${userId}`);
    }

    getProjectTasks(projectId) {
        return axios.get(`${API_URL}/tasks/project/${projectId}`);
    }

    updateTaskStatus(id, status) {
        return axios.patch(`${API_URL}/tasks/${id}/status?status=${status}`);
    }

    deleteTask(id) {
        return axios.delete(`${API_URL}/tasks/${id}`);
    }

    getOverdueTasks() {
        return axios.get(`${API_URL}/tasks/overdue`);
    }
}

export default new ApiService();