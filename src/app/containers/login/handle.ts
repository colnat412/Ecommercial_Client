import { api, setAccessToken } from '@/src/libs';
import { Account } from '@/src/types';

export interface LoginResponse {
	account: Account | null;
	erro: string | null;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
	// Login -> return account
	// use AuthSecureStore.login to set account + accessToken
	// Redux -> Action: load cart, favorite
	// ========================================
	try {
		const response = await api.post('api/auth/login', {
			identifier: username,
			password: password,
		});
		const accountData: Account = response.data.data;


		if (response.data.statusCode !== 200) {
			return {
				account: null,
				erro: 'Invalid username or password',
			};
		}

		setAccessToken(accountData.accessToken);
		return {
			account: accountData,
			erro: null,
		};
	} catch (err) {
		console.log('Login:' + err);
		return {
			account: null,
			erro: 'Something went wrong',
		};
	}
};
