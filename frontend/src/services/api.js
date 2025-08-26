import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/signup', data);

// Job APIs
export const getJobs = (params) => API.get("/jobs", { params }); 
export const getAdminJobs = () => API.get('/jobs/admin');
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const getUniqueCompanies = () => API.get('/jobs/companies');
export const getUniqueCities = () => API.get('/jobs/cities');

export default API;
