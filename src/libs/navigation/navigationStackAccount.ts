
import { RouteProp } from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export const StackAccount = createNativeStackNavigator<RootStackAccountParamList>();

export type RootStackAccountParamList = {
    Account: undefined;
    Order: undefined;
    OrderDetail: undefined;
    Feedback: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackAccountParamList {}
	}
}

export type StackScreenAccountNavigationProp =
	NativeStackNavigationProp<RootStackAccountParamList>;

export type StackScreenAccountRouteProp = RouteProp<RootStackAccountParamList>;
