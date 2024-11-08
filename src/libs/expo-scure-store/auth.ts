import { Account } from "@/src/types/account";
import * as SecureStore from "expo-secure-store";
import { setAccessToken } from "../axios/axiosConfig";

const login = async (account: Account) => {
     // Set token to axios
     setAccessToken(account.accessToken);

     // Save account and token to SecureStore
     const accountData = JSON.stringify(account);
     await SecureStore.setItemAsync(
          "accountData",
          accountData
     );
     await SecureStore.setItemAsync(
          "token",
          account.accessToken
     );
};

const logout = async () => {
     // Clear axios token
     setAccessToken("");

     // Clear SecureStore
     await SecureStore.deleteItemAsync(
          "accountData"
     );
     await SecureStore.deleteItemAsync("token");
};

const getAccount = async () => {
     const accountData =
          await SecureStore.getItemAsync(
               "accountData"
          );
     return accountData
          ? JSON.parse(accountData)
          : null;
};

const getToken = async () => {
     return await SecureStore.getItemAsync(
          "token"
     );
};

export const AuthSecureStore = {
     login,
     logout,
     getAccount,
     getToken,
};
