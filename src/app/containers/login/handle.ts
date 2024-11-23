import { api, setAccessToken } from '@/src/libs';
import { Account, BaseAxiosResponse, DetailInformation } from '@/src/types';
import axios from 'axios';

export const login = async (username: string, password: string) => {
	// Login -> return account
	// use AuthSecureStore.login to set account + accessToken
	// Redux -> Action: load cart, favorite
	// ========================================
	try {
		const response = await api.post('api/auth/login', {
			identifier: username,
			password: password,
		});
		if (response.data.statusCode === 200) {
			const data: BaseAxiosResponse<{
				account: Account;
				detailInformation: DetailInformation;
			}> = {
				data: {
					account: response.data.data,
					detailInformation: response.data.data.detailInformation,
				},
				message: response.data.message,
				statusCode: response.data.statusCode,
			};
			setAccessToken(data.data?.account.accessToken || '');
			return data;
		}



	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) {
			const data: BaseAxiosResponse<{
				account: Account;
				detailInformation: DetailInformation;
			}> = {
				data: null,
				message: err.response?.data.message || 'Internal Server Error',
				statusCode: err.response?.data.statusCode || 500,
			};
			return data;
		}
	}
};
