import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/LoginPage.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.token) {
        await login(response.data);
        navigate('/chat');
      } else {
        setApiError('Invalid response from server');
      }
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message || 'Login failed. Please check your credentials.');
      } else if (error.request) {
        setApiError('No response from server. Please check your connection.');
      } else {
        setApiError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Section */}
        <div className="login-left">
          <img src="/doodle-chatbot-home-image.svg" alt="Logo" className="login-logo" />
          <h2 className="welcome-text">
            AI-CHATBOT
          </h2>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <h2 className="login-form-title">
            Login details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="E-mail"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            > 
              {isLoading ? 'Logging In...' : 'Login'}
            </button>

            {apiError && <span className="error-text">{apiError}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
