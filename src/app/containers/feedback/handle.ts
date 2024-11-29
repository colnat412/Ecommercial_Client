import { BE_URL } from "@/env";
import { api } from "@/src/libs";
import { BaseAxiosResponse, Feedback } from "@/src/types";
import axios from "axios";

export const fetchAddFeedback = async (id: string,comment: string, rating: number, image: string) => {
	try {
		const response = await api.put(`${BE_URL}/api/feedbacks/${id}`,{
            comment: comment,
            rating: rating,
            image_url: image
        });
		const data: BaseAxiosResponse<Feedback> = {
			data: response.data.data,
			statusCode: response.data.statusCode,
			message: response.data.message,
		};
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<Feedback> = {
				data: null,
				statusCode: err.response?.data.statusCode || 500,
				message: err.response?.data.message || 'Internal Server Error',
			};
			return data;
		}
	}
};
