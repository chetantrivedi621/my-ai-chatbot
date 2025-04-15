import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

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
      const response = await axios.post('http://localhost:5000/api/users/register', formData, {
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
        setApiError(error.response.data.message || 'Registration failed. Please try again.');
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
    <div className="register-container">
      <div className="register-card">
        {/* Left Section */}
        <div className="register-left">
          <img src="/doodle-chatbot-home-image.svg" alt="Logo" className="register-logo" />
          <h2 className="welcome-text">
            AI-CHATBOT
          </h2>
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="register-right">
          <h2 className="register-form-title">
            Register Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Full Name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
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
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            {apiError && <span className="error-text">{apiError}</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
