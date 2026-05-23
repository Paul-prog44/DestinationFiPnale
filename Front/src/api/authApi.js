
import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/api" });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// chaque focntion appelle une route prédéfini dans AuthController
export const login = (data) =>
    API.post("/auth/login", data).then((r) => r.data);

export const register = (data) =>
    API.post("/auth/register", data).then((r) => r.data);

export const getMe = () =>
    API.get("/auth/me").then((r) => r.data);

export default API;