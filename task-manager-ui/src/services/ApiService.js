import axios from 'axios';

const API_URL = "http://localhost:8080/api";

class ApiService {
    signup(user) {
        return axios.post(`${API_URL}/auth/signup`, user);
    }

    login(user) {
        return axios.post(`${API_URL}/auth/login`, user);
    }

    getProjects() {
        return axios.get(`${API_URL}/projects/all`);
    }

    createProject(project) {
        return axios.post(`${API_URL}/projects/create`, project);
    }
}

export default new ApiService();