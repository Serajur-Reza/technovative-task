import { baseUrl } from "@/constants/url";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "SomeOtherApiKey",
    // "edc.web.rest.cors.origins": "http://localhost:3000/assets",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default api;
