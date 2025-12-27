import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create department
export const createDepartment = async (departmentData) => {
  try {
    const response = await api.post('/departments', departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all departments
export const getDepartments = async () => {
  try {
    const response = await api.get('/department');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
