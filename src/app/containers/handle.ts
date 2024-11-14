import { BE_URL } from '@/env';
import axios from 'axios';

export const getData = async ({ urlApi }: { urlApi: string }) => {
	const { data } = await axios.get(BE_URL + urlApi);
	return data;
};
