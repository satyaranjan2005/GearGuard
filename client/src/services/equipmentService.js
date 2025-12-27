import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create equipment
export const createEquipment = async (equipmentData) => {
  try {
    const response = await api.post('/equipment', equipmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all equipment
export const getEquipment = async () => {
  try {
    const response = await api.get('/equipment');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
