import { StackScreenNavigationProp } from "@/src/libs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { DismissKeyboardView } from "../components";
import { ScrollView, View } from "react-native";
import { colors, style } from "@/src/constants";
import { Brand } from "@/src/assets";
import { Button, Text, TextInput } from "react-native-paper";
import { GoBack } from "../navigation/components";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation<StackScreenNavigationProp>();

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
			<ScrollView
				style={{ marginTop: 32, padding: 16, backgroundColor: colors.background }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<View style={[style.centerContainer, style.body]}>
					<GoBack navigation={navigation} />
					<View
						style={{
							gap: 10,
							marginBottom: 32,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Brand width={177} height={177} />
						<Text
							style={{
								color: colors.brand,
								fontSize: 24,
								fontWeight: 'bold',
							}}
						>
							Login
						</Text>
					</View>

					<View style={[style.columnCenter]}>
						{error && <Text>{error}</Text>}
						<TextInput
							label="Username"
							value={username}
							onChangeText={setUsername}
							style={[style.textInput]}
							activeOutlineColor={colors.brand}
							mode="outlined"
						/>
						<TextInput
							mode="outlined"
							label={'Password'}
							value={password}
							onChangeText={setPassword}
							style={[style.textInput]}
							activeOutlineColor={colors.brand}
							secureTextEntry={true}
						/>
					</View>

					<Text
						style={{
							color: colors.secondText,
							textAlign: 'right',
							paddingBottom: 32,
							width: '100%',
						}}
					>
						Forgot password?
					</Text>

					<Button
						onPress={() => {
							handleLogin();
						}}
						style={[style.button]}
						mode="contained"
						textColor={colors.textBrand}
					>
						Login
					</Button>

					<Text
						style={{
							color: colors.secondText,
							textAlign: 'center',
							paddingTop: 16,
						}}
					>
						Don't have an account?
						<Text
							onPress={() => navigation.navigate('Register')}
							style={{ color: colors.brand }}
						>
							{' Register'}
						</Text>
					</Text>
				</View>
			</ScrollView>
		</DismissKeyboardView>
  );
};
