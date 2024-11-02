import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { api, setAccessToken } from "../libs";
import * as SecureStore from 'expo-secure-store';

export const LoginTest = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {


        // Login -> return account
        // use AuthSecureStore.login to set account + accessToken
        // Redux -> Action: load cart, favorite


        // ========================================



        // try {
        //     const response = await api.post('api/auth/login', {
        //         "identifier": username,
        //         "password": password
        //     });
        //     const { accessToken } = response.data.data;
        //     setAccessToken(accessToken);
        //     // console.log(accessToken);
        //     setError('');
        //     // Redirect or perform other actions after successful login

        //     const response2 = await api.get('api/favorite/1');
        //     console.log(JSON.stringify(response2.data));
        // } catch (err) {
        //     setError('Invalid username or password');
        // }



    };

    return (
        <View>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button onPress={() => { handleLogin() }}>Accept</Button>
            {error && <Text>{error}</Text>}
        </View>
    );
}

