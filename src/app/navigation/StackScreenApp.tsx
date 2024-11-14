import { Stack, useAppDispatch } from '@/src/libs';
import { NavigationContainer } from '@react-navigation/native';

import {
	Feedback,
	Login,
	OrderComponent,
	PaymentOption,
	PaymentResult,
	ProductDetail,
	Register,
	SubCategory,
} from '../containers';
import { TabScreenApp } from './TabScreenApp';
import { useEffect, useState } from 'react';
import { checkConnect } from '../localHandle';
import { ErroContainter } from '../components';
import { ActivityIndicator } from 'react-native-paper';
import { colors, style } from '@/src/constants';
import { View } from 'react-native';


export const StackScreenApp = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isConnect, setIsConnect] = useState<boolean>(false);

	useEffect(() => {
		const connect = async () => {
			const response = await checkConnect();
			if (response.status === 500) {
				setIsConnect(false);
				setIsLoading(false);
			}else {
				setIsConnect(true);
				setIsLoading(false);
			}
		}
		connect();
	}, [])

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
								<Stack.Screen name="Feedback" component={Feedback} />
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
