import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import {
	Account,
	BaseAxiosResponse,
	CartItem,
	DetailInformation,
	Feedback,
	Order,
	Product,
	Role,
} from '@/src/types';
import axios from 'axios';
export const fetchDetailInformation = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/detail-information/my`);
		const data: BaseAxiosResponse<DetailInformation> = await response.data;
		return {
			data: data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<DetailInformation> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};

export const fetchFavorite = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/favorites/my-favorites`);
		const data: BaseAxiosResponse<Product[]> = {
			data: response.data.data.map((item: any) => item.product),
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<Product[]> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};

export const fetchCart = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/carts`);
		const data: BaseAxiosResponse<CartItem[]> = {
			data: response.data.data.cartItems,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<CartItem[]> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};

export const fetchFeedback = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/feedbacks`);
		const data: BaseAxiosResponse<Feedback[]> = {
			data: response.data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<Feedback[]> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};

export const fetchMyAccount = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/auth/my-account`);
		const data: BaseAxiosResponse<{
			account: Account;
			detailInformation: DetailInformation;
			role: Role;
		}> = {
			data: {
				account: response.data.data,
				detailInformation: response.data.data.detailInformation,
				role: response.data.data.role,
			},
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<{
				account: Account;
				detailInformation: DetailInformation;
				role: Role;
			}> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};

export const fetchOrder = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/orders`);
		const data: BaseAxiosResponse<Order[]> = {
			data: response.data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<Order[]> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
}