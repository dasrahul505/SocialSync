import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  },
  
  register: async (email: string, password: string, name: string) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    localStorage.setItem('token', data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const videos = {
  upload: async (formData: FormData) => {
    const { data } = await api.post('/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  getAll: async () => {
    const { data } = await api.get('/videos');
    return data;
  },

  getOne: async (id: string) => {
    const { data } = await api.get(`/videos/${id}`);
    return data;
  },
};

export const social = {
  getAccounts: async () => {
    const { data } = await api.get('/social/accounts');
    return data;
  },

  disconnect: async (platform: string) => {
    const { data } = await api.post(`/social/disconnect/${platform}`);
    return data;
  },

  refreshTokens: async () => {
    const { data } = await api.get('/social/refresh-tokens');
    return data;
  },
};

export default api;