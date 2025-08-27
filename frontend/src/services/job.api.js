import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:8000',
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

export const getAllJobs = ({ search = "", sortBy = "createdAt", sortOrder = "desc" }) => {
  let url = `/api/jobs?sortBy=${sortBy}&sortOrder=${sortOrder}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  return API.get(url);
};

export const getJobById = (id) => {
  return API.get(`/api/jobs/${id}`);
};