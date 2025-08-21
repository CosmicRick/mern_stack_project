import axios from "axios";

// Detect environment and set backend URL
const BASE_URL =
  import.meta.env.VITE_API_URL || // For Vite (check .env file)
  process.env.REACT_APP_API_URL || // For CRA
  "http://localhost:5000/api"; // Default fallback (dev)

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // If unauthorized (token expired or invalid)
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        // Optional: redirect to login
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Example API functions
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/signup", data);

export default API;
smq-pphs-hkd