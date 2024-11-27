import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { BaseAxiosResponse, OrderDetail } from '@/src/types';
import axios from 'axios';

export const fetchOderDetail = async (orderId: string) => {
	try {
		const response = await api.get(`${BE_URL}/api/orders/${orderId}`);
		const data: BaseAxiosResponse<OrderDetail> = {
			data: response.data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<OrderDetail> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};
