import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser} from '../../services/api';
const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // direct axios call (no wrapper function)
      const response = await registerUser(formData);

      if (response) {
     
         alert("Signup successful! 🎉 Please login.");
        navigate("/");
        console.log('/login');
        
      } else {
        setError("Signup failed. Please try again.");
         alert("Signup Failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup.");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter a password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select your role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="read-the-docs">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;