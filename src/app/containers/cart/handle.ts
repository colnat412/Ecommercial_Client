import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { Product } from '@/src/types';

export const getCartItem = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/carts`);
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

export const saveProductToCart = async (product: Product) => {
	try {
		const response = await api.post(`${BE_URL}/carts`, {
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image_url,
			quantity: 1,
		});
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

export const updateProductInCart = async (id: string) => {
	try {
		const response = await api.put(`${BE_URL}/carts/${id}`);
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

export const deleteProductInCart = async (id: string) => {
	try {
		const response = await api.delete(`${BE_URL}/carts/${id}`);
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
