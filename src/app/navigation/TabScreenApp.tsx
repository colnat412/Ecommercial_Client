import {
	ChatBox,
	Favorite as FavoriteIcon,
	Home,
	Search as SearchIcon,
	User,
} from '@/src/assets';
import { colors } from '@/src/constants';
import { Tab, useAppSelector } from '@/src/libs';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { HomePage } from '../containers';
import { Account } from '../containers/account/Account';
import { Favorite } from '../containers/favorite';
import { SearchPage } from '../containers/searchComponent';
import { Chat, ListChat } from '../containers/chat';
import { Role } from '@/src/types';

export const TabScreenApp = () => {
	const role: Role | null = useAppSelector(
		(state) => state.auth?.role ?? null,
	);

	console.log('role', role);
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
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
					if (!role && route.name === 'ListChat') {
						return null;
					} else if (role) {
						if (role.name === 'customer' && route.name === 'ListChat') {
							return null;
						} else if (role.name === 'admin' && route.name === 'Chat') {
							return null;
						}
					}

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
				tabBarShowLabel: true,
			})}
			initialRouteName="ListChat"
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
				component={SearchPage}
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
				name="ListChat"
				component={ListChat}
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
