import { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { api, RootTabParamList, setAccessToken } from "../libs";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import { style } from "../constants/style";
import { Brand } from "../assets";
import { colors } from "../constants/color";
import { DismissKeyboardView } from "./components/DissmissKeyboardView";
import { GoBack } from "./navigation";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation<RootTabParamList>();

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
        <DismissKeyboardView>
            <View style={[style.centerContainer, style.body]}>
                <GoBack />
                <View style={{ gap: 10, marginBottom: 32, justifyContent: "center", alignItems: "center" }}>
                    <Brand width={177} height={177} />
                    <Text style={{ color: colors.brand, fontSize: 24, fontWeight: "bold" }}>Login</Text>
                </View>

                <View style={[style.columnCenter]}>

                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={[style.textInput]}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        style={[style.textInput]}
                    />
                </View>

                <Text
                    style={{ color: colors.secondText, textAlign: "right", paddingBottom: 32, width: "100%" }}>
                    Forgot password?
                </Text>

                <Button
                    onPress={() => { handleLogin() }}
                    buttonColor={colors.brand}
                    textColor={colors.textBrand}
                    style={[style.button]}
                ><Text style={[style.buttonText]}>Accept</Text></Button>
                {error && <Text>{error}</Text>}
            </View>
        </DismissKeyboardView>
    );
}

