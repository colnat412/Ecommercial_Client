import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { AxiosResponse } from 'axios';

export const checkConnect = async () => {
	try {
		const response: AxiosResponse = await api.get(`${BE_URL}`);
		return {
			status: response.status,
			message: response.statusText,
		};
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			message: 'Internal Server Error',
		};
	}
};
