import { BE_URL } from '@/env';
import { api } from '@/src/libs';
import { BaseAxiosResponse } from '@/src/types';
import axios from 'axios';

export const fetchChatRoom = async () => {
	try {
		const response = await api.get(`${BE_URL}/api/rooms`);
		const data: BaseAxiosResponse<
			{
				roomId: string;
				userId: string;
				avatar: string;
				name: string;
				lastMessage: {
					message: string;
					senderId: string;
				};
			}[]
		> = {
			data: response.data.data,
			statusCode: response.data.status,
			message: response.data.message,
		};
		return data;
	} catch (error) {
		console.log(error);
		if (axios.isAxiosError(error)) {
			const data: BaseAxiosResponse<
                {
                    roomId: string;
                    userId: string;
                    avatar: string;
                    name: string;
                    lastMessage: {
                        message: string;
                        senderId: string;
                    };
                }[]
            > = {
                data: [],
                statusCode: 500,
                message: error.message,
            };
            return data;
		}
	}
};
