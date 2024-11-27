import { BE_URL } from '@/env';
import { api } from '@/src/libs';

export const getOrder = async () => {
	const { data } = await api.get(BE_URL + '/api/orders');
	return data;
};
