import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 15000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // lưu sau khi login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
