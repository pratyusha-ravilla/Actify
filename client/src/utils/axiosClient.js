
// //client/src/utils/axiosClient.js


import axios from "axios";

// Set VITE_API_BASE_URL at build time (e.g. "/api" when the SPA and API share
// a host behind Nginx). Falls back to localhost for `npm run dev`.
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api";

const axiosClient = axios.create({
  baseURL,
  
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const user = localStorage.getItem("actirepo_user");

  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;