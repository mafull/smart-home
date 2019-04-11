import axios from "axios";


export const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:3010/api"
    : "http://fullersmarthome.ddns.net/api";


export const api = axios.create({
    baseURL,
    withCredentials: true
});
