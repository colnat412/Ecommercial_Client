import { Tab } from '@/src/libs';
import { colors } from '@/src/constants';
import {
	Home,
	Search as SearchIcon,
	Favorite as FavoriteIcon,
	User,
	ChatBox,
} from '@/src/assets';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { Account, Chat, Favorite, HomePage, Search } from '../containers';

export const TabScreenApp = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
				tabBarLabel(props) {
					return (
						<Text
							style={{
								color: props.focused ? colors.brand : colors.disable,
								fontSize: 10,
								fontWeight: '700',
							}}
						>
							{props.children}
						</Text>
					);
				},
				tabBarButton: (props) => {
					return (
						<TouchableOpacity
							{...props}
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								padding: 5,
							}}
						>
							{props.children}
						</TouchableOpacity>
					);
				},
				tabBarStyle: {
					minHeight: 40,
					justifyContent: 'center',
					alignItems: 'center',
				},
			}}
			initialRouteName="HomePage"
		>
			<Tab.Screen
				name="HomePage"
				component={HomePage}
				options={{
					title: 'Home',
					tabBarIcon: ({ focused }) => (
						<Home
							width={20}
							height={20}
							color={focused ? colors.brand : colors.disable}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					title: 'Search',
					tabBarIcon: ({ focused }) => (
						<SearchIcon
							width={20}
							height={20}
							color={focused ? colors.brand : colors.disable}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Favorite"
				component={Favorite}
				options={{
					title: 'Favorite',
					tabBarIcon: ({ focused }) => (
						<FavoriteIcon
							width={20}
							height={20}
							color={focused ? colors.brand : colors.disable}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Chat"
				component={Chat}
				options={{
					title: 'Chat',
					tabBarIcon: ({ focused }) => (
						<ChatBox
							width={20}
							height={20}
							color={focused ? colors.brand : colors.disable}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Account}
				options={{
					title: 'Account',
					tabBarIcon: ({ focused }) => (
						<User
							width={20}
							height={20}
							color={focused ? colors.brand : colors.disable}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
