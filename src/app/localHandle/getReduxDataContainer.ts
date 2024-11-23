import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { BaseAxiosResponse, DetailInfomation, Product } from '@/src/types';
export const fetchDetailInformation = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/detail-information/my`);
		const data: BaseAxiosResponse<DetailInfomation> = await response.data;
		return {
			data: data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
	} catch (err) {
		console.log(err);
		const data: BaseAxiosResponse<DetailInfomation> = {
			data: null,
			statusCode: 500,
			message: 'Internal Server Error',
		};
		return data;
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
		const data: BaseAxiosResponse<Product[]> = {
			data: null,
			statusCode: 500,
			message: 'Internal Server Error',
		};
		return data;
	}
};

export const fetchCart = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/carts/my-cart`);
		const data: BaseAxiosResponse<Product[]> = {
			data: response.data.data.map((item: any) => item.product),
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		const data: BaseAxiosResponse<Product[]> = {
			data: null,
			statusCode: 500,
			message: 'Internal Server Error',
		};
		return data;
	}
};

export const fetchFeedback = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/carts/my-cart`);
		const data: BaseAxiosResponse<Product[]> = {
			data: response.data.data.map((item: any) => item.product),
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		const data: BaseAxiosResponse<Product[]> = {
			data: null,
			statusCode: 500,
			message: 'Internal Server Error',
		};
		return data;
	}
};
