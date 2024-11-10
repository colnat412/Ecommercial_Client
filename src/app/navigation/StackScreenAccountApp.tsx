import { StackAccount } from '@/src/libs';
import { NavigationContainer } from '@react-navigation/native';
import { Order } from '../containers/Order';
import { Account } from '../containers';

export const StackScreenAccountApp = () => {
	return (
			<StackAccount.Navigator screenOptions={{headerShown: false}}>
				<StackAccount.Screen name="Account" component={Account} />
				<StackAccount.Screen name="Order" component={Order} />
			</StackAccount.Navigator>
	);
};
