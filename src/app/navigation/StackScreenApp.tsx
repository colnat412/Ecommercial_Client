import { api, AppDispatch, getAccessTokenSecure, setAccessToken, Stack, useAppDispatch } from '@/src/libs';
import { NavigationContainer } from '@react-navigation/native';
import { TabScreenApp } from './TabScreenApp';
import { useEffect, useState } from 'react';

import { ErroContainter } from '../components';
import { ActivityIndicator } from 'react-native-paper';
import { colors, style } from '@/src/constants';
import { View } from 'react-native';
import { checkConnect } from '../localHandle';
import { Account } from '@/src/types';
import { setAuth } from '@/src/libs/redux/store';
import { Register } from '../containers';
import { ProductDetail } from '../containers/productDetail';
import { SubCategory } from '../containers/category';
import { PaymentOption, PaymentResult } from '../containers/payment';
import { OrderComponent, OrderDetail } from '../containers/order';
import { Feedback } from '../containers/feedback';
import { Carts } from '../containers/cart';
import { Login } from '../containers/login';


export const StackScreenApp = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isConnect, setIsConnect] = useState<boolean>(false);

	const dispatch = useAppDispatch<AppDispatch>();

	useEffect(() => {
		const connect = async () => {
			try {
				const response = await checkConnect();
				if (response.status === 500) {
					setIsConnect(false);
					setIsLoading(false);
					console.log('Stack Screen: Connect failed');
				} else {
					setIsConnect(true);
					setIsLoading(false);
					console.log('Stack Screen: Connect success');
				}
			} catch (e) {
				console.log(e);
			}

			const tokenSecure = await getAccessTokenSecure();

			setAccessToken(tokenSecure ? tokenSecure : '');

			try {
				const request = await api.get('/api/auth/my-account');
				if (request.status === 200) {
					const account: Account = request.data.data;
					dispatch(setAuth({account}));
					// console.log('Stack Screen:' + account.accessToken);
					console.log('Stack Screen: AccessToken success');
				}
				else {
					console.log('Stack Screen: AccessToken failed');
				}

			} catch (error) {
				console.log('Stack Screen: AccessToken failed');
			}

			// try {
			// 	const autoLogin = await axios.post(`${BE_URL}/api/auth/login`, {
			// 		identifier: 'user2',
			// 		password: '123',
			// 	});

			// 	const { id, accessToken } = autoLogin.data.data;

			// 	login(id, accessToken);
			// 	console.log('Stack Sreen: AccessToken success');
			// } catch (error) {
			// 	console.log('Stack Sreen: AccessToken failed');
			// }
		};
		connect();
	}, []);

	return (
		<View style={[style.body]}>
			{isLoading ? (
				<View
					style={[
						style.body,
						{ justifyContent: 'center', alignItems: 'center' },
					]}
				>
					<ActivityIndicator size={'large'} color={colors.brand} />
				</View>
			) : (
				<>
					{isConnect ? (
						<NavigationContainer>
							<Stack.Navigator
								initialRouteName="TabScreenApp"
								screenOptions={{
									headerShown: false,
									animation: 'fade_from_bottom',
								}}
							>
								<Stack.Screen
									name="TabScreenApp"
									component={TabScreenApp}
								/>
								<Stack.Screen name="Login" component={Login} />
								<Stack.Screen name="Register" component={Register} />
								<Stack.Screen
									name="ProductDetail"
									component={ProductDetail}
								/>
								<Stack.Screen
									name="SubCategory"
									component={SubCategory}
								/>
								<Stack.Screen
									name="PaymentOption"
									component={PaymentOption}
								/>
								<Stack.Screen
									name="PaymentResult"
									component={PaymentResult}
								/>
								<Stack.Screen name="Order" component={OrderComponent} />
								<Stack.Screen
									name="OrderDetail"
									component={OrderDetail}
								/>
								<Stack.Screen name="Feedback" component={Feedback} />
								<Stack.Screen name="Cart" component={Carts} />
							</Stack.Navigator>
						</NavigationContainer>
					) : (
						<View
							style={[
								style.body,
								{ justifyContent: 'center', alignItems: 'center' },
							]}
						>
							<ErroContainter />
						</View>
					)}
				</>
			)}
		</View>
	);
};
