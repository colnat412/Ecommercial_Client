import { BE_URL } from '@/env';
import axios from 'axios';

export const getCategory = async () => {
	const { data } = await axios.get(BE_URL + '/categories');
	return data;
};
