import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { Product } from '@/src/types';

export const saveProductToCart = async (product: Product) => {
	try {
		const response = await api.post(`${BE_URL}/carts`, product);
		return {
			data: response.data,
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
