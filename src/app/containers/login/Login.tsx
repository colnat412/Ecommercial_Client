import {  AppDispatch, setAccessToken, setAccessTokenSecure, StackScreenNavigationProp, useAppDispatch } from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { DismissKeyboardView } from '../../components';
import { Pressable, ScrollView, View } from 'react-native';
import { colors, style } from '@/src/constants';
import { Brand } from '@/src/assets';
import {  Text, TextInput } from 'react-native-paper';
import { GoBack } from '../../navigation/components';
import { Account } from '@/src/types';
import { login, LoginResponse } from './handle';
import { setAuth } from '@/src/libs/redux/store';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigation = useNavigation<StackScreenNavigationProp>();
	const dispatch = useAppDispatch<AppDispatch>();

	const handleLogin = async () => {
		const resultLogin: LoginResponse =
			await login(username, password);

		if (resultLogin.erro) {
			setError(resultLogin.erro);
			return;
		}else if (resultLogin.account) {
			const account: Account| null = resultLogin.account;
			console.log ('Login Page Return: ' + account.accessToken);
			if (account) {
				dispatch(setAuth({ account }));
				setAccessToken(account.accessToken);
				setAccessTokenSecure(account.accessToken);
			}
			navigation.navigate('TabScreenApp');
		}
	};

	return (
		<DismissKeyboardView>
			<ScrollView
				style={{
					marginTop: 32,
					padding: 16,
					backgroundColor: colors.background,
				}}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<View style={[style.centerContainer, style.body]}>
					<GoBack />
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
						{error && (
							<Text style={{ color: colors.dangerous }}>{error}</Text>
						)}
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

					<Pressable
						onPress={() => {
							handleLogin();
						}}
						style={[style.button, { paddingVertical: 12 }]}
					>
						<Text
							style={{
								color: colors.textBrand,
								fontWeight: 'bold',
								fontSize: 20,
							}}
						>
							Login
						</Text>
					</Pressable>

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
