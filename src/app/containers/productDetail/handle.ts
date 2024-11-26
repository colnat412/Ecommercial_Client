import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import {
	BaseAxiosResponse,
	Feedback,
	FeedbackProductDetail,
	Product,
	ProductDetail,
} from '@/src/types';
import { Option } from '@/src/types/option';
export const getProduct = async (productId: string) => {
	try {
		const response = await api.get(`${BE_URL}/api/products/get/${productId}`);
		const data: ProductDetail = response.data.data;
		return {
			data: data,
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.log(error);
		return {
			data: null,
			status: 500,
			message: 'Internal Server Error',
		};
	}
};
export const getReviews = async (productId: string) => {
	try {
		const response = await api.get(`${BE_URL}/api/feedbacks/${productId}`);
		const data: BaseAxiosResponse<FeedbackProductDetail[]> = {
			data: response.data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (error) {
		console.log(error);
		const data: BaseAxiosResponse<FeedbackProductDetail[]> = {
			data: null,
			statusCode: 500,
			message: 'Internal Server Error',
		};
		return data;
	}
};
export const getOptionsOfProduct = async (productId: string) => {
	try {
		const response = await api.get(
			`${BE_URL}/api/option/product/${productId}`,
		);
		const data: Option[] = response.data.data;
		return {
			data: data,
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: 500,
			message: 'Internal Server Error',
		};
	}
};
export const getListOptionsOfOption = async (optionId: string) => {
	try {
		const response = await api.get(
			`${BE_URL}/api/list-option/option/${optionId}`,
		);
		const data: Option[] = response.data.data;
		return {
			data: data,
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.log(error);
		return {
			data: [],
			status: 500,
			message: 'Internal Server Error',
		};
	}
};
export const addProductToCart = async (
	itemId: string,
	qty: number,
	listOptionId: string[],
) => {
	try {
		const response = await api.post(`${BE_URL}/api/carts/add-product`, {
			itemId: itemId,
			quantity: qty,
			listOptionId: listOptionId,
		});
		const data = response.data;
		return {
			data: data,
			status: response.status,
			message: response.statusText,
		};
	} catch (error) {
		console.log(error);
		return {
			data: null,
			status: 500,
			message: 'Internal Server Error',
		};
	}
};

export const getRelationProduct = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/products/relation-product`);
		const data: BaseAxiosResponse<Product[]> = {
			data: response.data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (error) {
		console.log(error);
		const data: BaseAxiosResponse<Product[]> = {
			data: [],
			statusCode: 500,
			message: 'Internal Server Error',
		};
		return data;
	}
};
