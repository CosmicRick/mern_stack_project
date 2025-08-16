<<<<<<< HEAD
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { form } from 'motion/react-client';


const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [formState, setFormState] = useState({
        loading: false,
        errors: {},
        showPasswords: false,
        success:false
    });

    //Validation Functions
    const validateEmail = (email) => {
      if (!email.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return 'Invalid email format';
      return ''; 
    };

    const validatePassword =(password) => {
        if (!password) return 'Password is required';
        return ''; 
    };

    //Handle input changes
    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        //Clear error when user starts typing
        if (formState.errors[name]) {
            setFormState(prev => ({
                ...prev,
                errors: {
                    ...prev.errors,
                    [name]: ''
                }
            }));
        }
    };

    const validateForm = () => {
        const errors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password)
        };

        //Remove empty errors
        Object.keys(errors).forEach(key => {
            if (!errors[key]) {
                delete errors[key];
            }
        });

        setFormState(prev => ({
            ...prev,
            errors
        }));
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setFormState(prev => ({ ...prev, loading: true }));

        try {
            //Login API injtregation
        } catch (error) {
            setFormState(prev => ({
                ...prev,
                loading: false,
                errors: {
                    ...prev.errors,
                    submit: error.response?.data?.message || 'Login failed. Please try again.'
                }
            }));
        }  
    };

    if (formState.success) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded shadow w-100"
                >
                    <CheckCircle className="text-success" size={48} />
                    <h2 className="h4 font-weight-bold text-dark mb-2">Login Successful</h2>
                    <p className="text-muted">You have successfully logged in!</p>
                    <div className="text-center mt-3" />
                    <p className="mb-0">
                        Redirecting to your dashboard...
                    </p>

                </motion.div>
            </div>
        );
    }

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <motion.div
                initial={{ opacity: 0, y: 20}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-4 rounded shadow w-100"
                style={{ maxWidth: '400px' }}
            >
                <div className="text-center mb-4">
                    <h2 className="h4 font-weight-bold text-dark mb-2">Welcome Back</h2>
                    <p className="text-muted">Login to Your JobPortal account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-3">
                        <label className="form-label">
                            Email Address
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChanges}
                                placeholder="Enter your email"
                                className="form-control"
                            />
                        </div>
                        {formState.errors.email && (
                            <div className="text-danger small mt-1 d-flex align-items-center">
                                <AlertCircle size={16} className="me-1" />
                                {formState.errors.email}
                            </div>
                        )}
                    </div>
                    {/* Password Input */}
                    <div className="mb-3">
                        <label className="form-label">
                            Password    
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <Lock size={18} />
                            </span>
                            <input
                                type={formState.showPasswords ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChanges}
                                placeholder="Enter your password"
                                className="form-control"
                            />
                            <button
                                type="button"
                                onClick={() => setFormState({ ...formState, showPasswords: !formState.showPasswords })}
                                className="input-group-text border-1 bg-white"
                                style={{ cursor: 'pointer' }}
                                tabIndex={-1}
                            >
                                {formState.showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {formState.errors.password && (
                            <div className="text-danger small mt-1 d-flex align-items-center">
                                <AlertCircle size={16} className="me-1" />
                                {formState.errors.password}
                            </div>
                        )}
                    </div>

                    {/* Submit Error*/}
                    {formState.errors.submit && (
                        <div className="text-danger small mb-3 d-flex align-items-center">
                            <p className="mb-0">
                                <AlertCircle size={16} className="me-1" />
                                {formState.errors.submit}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={formState.loading}
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    >
                        {formState.loading ? (
                           <> 
                            <Loader className="spinner-border spinner-border-sm me-2" />
                        ):(
                            <CheckCircle className="text-success me-2" />
                            <span>Signin In...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                    
                    {/* Sign Up Link */}
                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Don't have an account?{' '} 
                            <a href="/signup" className="text-primary">
                            Create One Here
                            </a>
                        </p>
                    </div>

                </form>
            </motion.div>
        </div>
        )
    }
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
>>>>>>> fe56032c462431074466306d5be91231c3805fc7

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    if (onLogin) onLogin(formData); // pass data to parent if needed
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p className="read-the-docs">
        Don’t have an account? <a href="/Signup.jsx">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
