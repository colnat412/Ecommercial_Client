import { BE_URL } from '@/env';
import { api } from '@/src/libs';

export const getPaymentSuccess = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/payment/successfully`);
		console.log('Payment success:', response.data);

		return {
			statusCode: response.data.statusCode,
			message: response.data.message,
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

export const postPaymentData = async (orderId: string) => {
	try {
		const response = await api.post(`${BE_URL}/api/payment/${orderId}`);
		return {
			data: response.data.data,
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

export const createOrder = async (cartItemIds: string[]) => {
	try {
		const response = await api.post(`${BE_URL}/api/orders`, {
			cartItemIds,
		});
		return {
			data: response.data.data,
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

export const getOrderById = async (orderId: string) => {
	try {
		const response = await api.get(`${BE_URL}/api/orders/${orderId}`);
		return {
			data: response.data.data,
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
