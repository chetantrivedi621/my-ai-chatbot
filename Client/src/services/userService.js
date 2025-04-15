import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Propagate error to calling function
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
