import {
	AppDispatch,
	getAccessTokenSecure,
	setAccessToken,
	Stack,
	useAppDispatch,
} from '@/src/libs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TabScreenApp } from './TabScreenApp';

import { colors, style } from '@/src/constants';
import {
	setAuth,
	setCart,
	setDetailInfomation,
	setFavorite,
	setFeedback,
	setOrder,
} from '@/src/libs/redux/store';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ErrorContainter } from '../components';
import { Register } from '../containers';
import { ShoppingCart } from '../containers/cart';
import { SubCategory } from '../containers/category';
import { ChatAdmin } from '../containers/chat';
import { Feedback } from '../containers/feedback';
import { Login } from '../containers/login';
import { OrderComponent, OrderDetail } from '../containers/order';
import { PaymentOption, PaymentResult } from '../containers/payment';
import { ProductDetail } from '../containers/productDetail';
import {
	checkConnect,
	fetchCart,
	fetchFavorite,
	fetchFeedback,
	fetchMyAccount,
	fetchOrder,
} from '../localHandle';

export const StackScreenApp = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isConnect, setIsConnect] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const dispatch = useAppDispatch<AppDispatch>();

	useEffect(() => {
		const connect = async () => {
			try {
				const response = await checkConnect();
				if (response.status === 500) {
					setIsConnect(false);
					setIsLoading(false);
					setError('Server error');
					return;
				} else {
					console.log('Stack Screen: Connect success');
				}
			} catch (e) {
				console.log(e);
			}

			const tokenSecure = await getAccessTokenSecure();

			setAccessToken(tokenSecure ? tokenSecure : '');

			if (tokenSecure !== '') {
				try {
					const account = await fetchMyAccount();

					if (account?.data && account.statusCode === 200) {
						dispatch(
							setAuth({
								account: account.data.account,
								role: account.data.role,
							}),
						);
						dispatch(setDetailInfomation(account.data.detailInformation));

						const favoriteData = await fetchFavorite();
						dispatch(setFavorite(favoriteData?.data || []));

						const feedbackData = await fetchFeedback();
						dispatch(setFeedback(feedbackData?.data || []));

						const cartData = await fetchCart();
						dispatch(setCart(cartData?.data || []));

						const orderData = await fetchOrder()
						dispatch(setOrder(orderData?.data || []))

						console.log('Stack Screen: AccessToken success');
					} else {
						console.log('Stack Screen: AccessToken failed');
					}
				} catch (error) {
					console.log('Stack Screen: AccessToken failed');
				}
			}
			setIsLoading(false);
			setIsConnect(true);
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
								<Stack.Screen name="Cart" component={ShoppingCart} />
								<Stack.Screen name="ChatAdmin" component={ChatAdmin} />
							</Stack.Navigator>
						</NavigationContainer>
					) : (
						<View
							style={[
								style.body,
								{ justifyContent: 'center', alignItems: 'center' },
							]}
						>
							<ErrorContainter message={error} type="large" />
						</View>
					)}
				</>
			)}
		</View>
	);
};
