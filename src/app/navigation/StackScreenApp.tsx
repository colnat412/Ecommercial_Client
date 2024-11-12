import { Stack } from '@/src/libs';
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

export const StackScreenApp = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="TabScreenApp"
				screenOptions={{
					headerShown: false,
					animation: 'fade_from_bottom',
				}}
			>
				<Stack.Screen name="TabScreenApp" component={TabScreenApp} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="ProductDetail" component={ProductDetail} />
				<Stack.Screen name="SubCategory" component={SubCategory} />
				<Stack.Screen name="PaymentOption" component={PaymentOption} />
				<Stack.Screen name="PaymentResult" component={PaymentResult} />
				<Stack.Screen name="Order" component={OrderComponent} />
				<Stack.Screen name="Feedback" component={Feedback} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
