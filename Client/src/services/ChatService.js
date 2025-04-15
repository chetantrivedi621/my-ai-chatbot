import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

export const sendMessageToBot = async (message) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/send`,
      { message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
