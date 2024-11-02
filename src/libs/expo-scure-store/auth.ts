import { Account } from '@/types/account';
import * as SecureStore from 'expo-secure-store';


const login = async (account: Account, token: string) => {
  const accountData = JSON.stringify(account);
  await SecureStore.setItemAsync('accountData', accountData);
  await SecureStore.setItemAsync('token', token);
};

const getAccount = async () => {
  const accountData = await SecureStore.getItemAsync('accountData');
  return accountData ? JSON.parse(accountData) : null;
};

const removeUserData = async () => {
  await SecureStore.deleteItemAsync('userData');
    await SecureStore.deleteItemAsync('token');
};