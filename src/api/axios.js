import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Thay bằng URL của Backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;