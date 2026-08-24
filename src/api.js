import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  login: (credentials) => client.post('/auth/login', credentials),
  register: (userData) => client.post('/auth/register', userData),
  getRecords: (type) => client.get('/records', { params: type ? { type } : {} }),
  createRecord: (payload) => client.post('/records', payload),
  deleteRecord: (id) => client.delete(`/records/${id}`),
};

export default api;