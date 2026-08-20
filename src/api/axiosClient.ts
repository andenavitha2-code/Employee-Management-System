import axios from 'axios';

// In production, set VITE_API_URL in your hosting provider's environment
// variables (e.g. Netlify) to point at your deployed JSON Server backend.
// Locally, it falls back to http://localhost:5000 (see package.json "server" script).
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
