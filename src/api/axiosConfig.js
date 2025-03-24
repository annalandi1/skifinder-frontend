import axios from "axios";

// Base URL del tuo backend
const API = axios.create({
  baseURL: "http://localhost:8080/api", // cambia se usi un altro port o path
});

// Aggiungi un interceptor globale ad Axios per ogni richiesta
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken"); // O ottienilo dalla tua gestione di stato
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
