import { BE_URL } from '@/env';
import axios from 'axios';

// Create an Axios instance
export const api = axios.create({
	baseURL: BE_URL,
});

// Function to set the access token
export const setAccessToken = (token: string | null) => {
	api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Add a request interceptor
api.interceptors.request.use(
	(config) => {
		const token = api.defaults.headers.common['Authorization'];
		if (token) {
			config.headers['Authorization'] = token;
		}
		return config;
	},
	(error) => {
		if (error.response.status === 401) {
					console.log(
			'\x1b[41m Axios\x1b[0m \x1b[31m \x1b[0m',
		);
		}

		return Promise.reject(error);
	},
);
