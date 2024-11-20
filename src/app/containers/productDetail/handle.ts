import { BE_RURL, BE_URL } from '@/env';
import { api } from '@/src/libs';
import { Feedback, ProductDetail } from '@/src/types';
export const getProduct = async (productId: string) => {
	try {
		const response = await api.get(`${BE_RURL}/api/products/${productId}`);
		const data: ProductDetail = response.data.data;
		return {
			data: data,
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.error(error);
		return {
			data: null,
			status: 500,
			message: 'Internal Server Error',
		};
	}
};
export const getReviews = async (productId: string) => {
	try {
		const response = await api.get(`${BE_URL}/feedbacks`);
		const data: Feedback[] = response.data;
		return {
			data: data,
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.error(error);
		return {
			data: [],
			status: 500,
			message: 'Internal Server Error',
		};
	}
};
