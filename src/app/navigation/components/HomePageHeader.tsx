import { Brand, Cart, User } from '@/src/assets';
import { colors, style } from '@/src/constants';
import {
	ScreenTabNavigationProp,
	StackScreenNavigationProp,
	useAppSelector,
} from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

export const HomePageHeader = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const navigationTab = useNavigation<ScreenTabNavigationProp>();

	const detailsInformation = useAppSelector((state) => state.detailInfomation);

	const goLogin = () => {
		if (detailsInformation.detailInfomation) {
			navigationTab.navigate('Account');
		} else {
			navigation.navigate('Login');
		}
	};

	const goCart = () => {
		navigation.navigate('Cart');
	};

	return (
		<View style={[style.headerContainer, { backgroundColor: 'white' }]}>
			<View style={[style.rowCenter]}>
				<Brand width={40} height={40} />
				<Text
					style={{
						fontSize: 24,
						color: colors.brand,
						fontFamily: 'FiraMonoBold',
					}}
				>
					FOTAINE
				</Text>
			</View>
			<View style={[style.rowCenter, { gap: 16 }]}>
				<Pressable onPress={goCart}>
					<Cart width={20} height={20} color={colors.cart} />
				</Pressable>
				<TouchableOpacity onPress={goLogin}>
					{detailsInformation.detailInfomation ? (
						<Image
							source={{
								uri: detailsInformation.detailInfomation.avatarUrl,
							}}
							width={30}
							height={30}
							style={{
								borderWidth: 2,
								borderColor: colors.brand,
								borderRadius: 300,
							}}
						/>
					) : (
						<User width={20} height={20} color={'black'} />
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};
