import { BE_URL } from "@/env";
import axios from "axios";

// Create an Axios instance
export const api = axios.create({
  baseURL: BE_URL,
});

// Function to set the access token
export const setAccessToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = api.defaults.headers.common["Authorization"];
    if (token) {
      config.headers["Authorization"] = token;
    }
    console.log(config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
