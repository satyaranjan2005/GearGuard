import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create maintenance team
export const createMaintenanceTeam = async (teamData) => {
  try {
    const response = await api.post('/maintenance-teams', teamData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all maintenance teams
export const getMaintenanceTeams = async () => {
  try {
    const response = await api.get('/maintenance-teams');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
