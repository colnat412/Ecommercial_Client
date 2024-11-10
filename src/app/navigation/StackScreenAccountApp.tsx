import { StackAccount } from '@/src/libs';
import { NavigationContainer } from '@react-navigation/native';
import { Account, Feedback, OrderComponent } from '../containers';

export const StackScreenAccountApp = () => {
	return (
		<StackAccount.Navigator
			initialRouteName="Account"
			screenOptions={{ headerShown: false }}
		>
			<StackAccount.Screen name="Account" component={Account} />
			<StackAccount.Screen name="Order" component={OrderComponent} />
			<StackAccount.Screen name="Feedback" component={Feedback} />
		</StackAccount.Navigator>
	);
};
