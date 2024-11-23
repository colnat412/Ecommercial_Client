import { api } from '@/src/libs';
import { BaseAxiosResponse } from '@/src/types';

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
		const data: BaseAxiosResponse<any> = {
			data: null,
			statusCode: 500,
			message: 'Internal Server Error',
		};
        return data;
	}
};
