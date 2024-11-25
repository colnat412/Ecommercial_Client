import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { BaseAxiosResponse, Product } from '@/src/types';
import axios from 'axios';

export const searchProduct = async (searchText: string) => {
	const response = await api.get(`${BE_URL}/api/products/search/${searchText}`);
	try {
		const data: BaseAxiosResponse<Product[]> = {
			data: response.data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<Product[]> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};

export const searchProductByPriceRange = async (
	minPrice: number,
	maxPrice: number,
) => {
	const response = await axios.get(
		`${BE_URL}/api/products/searchProductByPriceRange/${minPrice}/${maxPrice}`,
	);
	return response.data.data;
};
