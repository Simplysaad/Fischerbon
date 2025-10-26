import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Your backend URL
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;
