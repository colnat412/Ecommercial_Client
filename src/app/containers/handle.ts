import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import axios from 'axios';

interface BaseAxiosResponse<T> {
	data: T | null;
	statusCode: number;
	message: string;
}

interface BaseAxiosRequest {
	url: string;
}

export const getData = async ({ urlApi }: { urlApi: string }) => {
	const { data } = await axios.get(BE_URL + urlApi);
	return data;
};

export const getDataFromDBS = async <T>({ url }: BaseAxiosRequest) => {
	try {
		const response = await api.get(BE_URL + url);
		const data: BaseAxiosResponse<T> = {
			data: response.data.data,
			statusCode: response.status,
			message: response.statusText,
		}
		

		return data;
	} catch (err) {
		console.log(err);
		const data: BaseAxiosResponse<T> = {
			data: null,
			statusCode: 500,
			message: 'Internal Server Error',
		};
		return data;
	}
};
