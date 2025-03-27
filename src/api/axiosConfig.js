import axios from "axios";

// Base URL del tuo backend
const API = axios.create({
  baseURL: "http://localhost:8080/api", // cambia se usi un altro port o path
});

// interceptor globale ad Axios
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
