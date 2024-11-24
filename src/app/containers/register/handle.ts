import { api } from '@/src/libs';
import { BaseAxiosResponse } from '@/src/types';
import axios from 'axios';

export const fetchRegister = async (dataInput: {
	email: string;
	username: string;
	password: string;
}) => {
	try {
		const ressponse = await api.post('/api/auth/register', dataInput);
		const data: BaseAxiosResponse<any> = {
			data: ressponse.data.data,
			statusCode: ressponse.status,
			message: ressponse.statusText,
		};
		return data;
	} catch (error) {
		console.log(error);
		if (axios.isAxiosError(error)) {
			const data: BaseAxiosResponse<any> = {
				data: null,
				statusCode: error.response?.status || 500,
				message: error.response?.statusText || 'Internal Server Error',
			};
			return data;
		}
	}
};

export const fetchUpdateDetailInformation = async (dataInput: {
	fullname?: string;
	phone?: string;
	address?: string;
	avatar?: string;
}) => {
	try {
		const payload: Record<string, string> = {};

		if (dataInput.fullname) {
			payload.full_name = dataInput.fullname;
		}
		if (dataInput.phone) {
			payload.phone = dataInput.phone;
		}
		if (dataInput.address) {
			payload.address = dataInput.address;
		}
		if (dataInput.avatar) {
			payload.avatar_url = dataInput.avatar;
		}

		const response = await api.patch(
			'/api/detail-information/update',
			payload,
		);

		const data: BaseAxiosResponse<any> = {
			data: response.data.data,
			statusCode: response.status,
			message: response.statusText,
		};
		return data;
	} catch (error) {
		console.log(error);
		if (axios.isAxiosError(error)) {
			const data: BaseAxiosResponse<any> = {
				data: null,
				statusCode: error.response?.status || 500,
				message: error.response?.statusText || 'Internal Server Error',
			};
			return data;
		}
	}
};
