import { Account } from '@/src/types/account';
import * as SecureStore from 'expo-secure-store';
import { setAccessToken } from '../axios/axiosConfig';
import { AppDispatch, useAppDispatch } from '../redux/config';
import { setAuth } from '../redux/store';



const setAccessTokenSecure = async (token: string) => {
	await SecureStore.setItemAsync('accessToken', token);
}

const getAccessTokenSecure = async () => {
	const token: string | null = await SecureStore.getItemAsync('accessToken');
	return token
};

export {getAccessTokenSecure, setAccessTokenSecure };
