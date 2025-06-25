import axios from "axios";

console.log("BASE URL:", process.env.REACT_APP_BACKEND_URL); // ✅ helpful debug log

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosClient;
