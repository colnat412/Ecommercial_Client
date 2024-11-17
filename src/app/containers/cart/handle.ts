import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { Cart, Product } from '@/src/types';

export const saveProductToCart = async (product: Product) => {
	try {
		const response = await api.post(`${BE_URL}/carts`, {
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.images_url,
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

export const updateProductInCart = async (cartData: Cart[]) => {
	try {
		const response = await api.put(`${BE_URL}/carts`, cartData);
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
