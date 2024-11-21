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
import { useEffect, useState } from 'react';

export const HomePageHeader = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const navigationTab = useNavigation<ScreenTabNavigationProp>();

	const [lengthCart, setLengthCart] = useState<number>(0);
	const [cardChange, setCardChange] = useState<boolean>(false);

	const detailsInformation = useAppSelector((state) => state.detailInfomation);

	useEffect(() => {
		const fetchData = async () => {
			// const data = await getData({ urlApi: '/carts' });
			// setLengthCart(data.length);
			// setCardChange(!cardChange);
		};
		fetchData();
	}, [cardChange]);

	const goLogin = () => {
		if (detailsInformation.detailInfomation) {
			navigationTab.navigate('Account');
		} else {
			navigation.navigate('Login');
		}
	};

	const goCart = async () => {
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
					<View style={{ position: 'relative', top: 12 }}>
						<Cart width={25} height={25} color={colors.cart} />
						<View
							style={{
								position: 'relative',
								top: -30,
								right: -15,
								backgroundColor: colors.brand,
								borderRadius: 10,
								width: 18,
								height: 18,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Text
								style={{
									color: 'white',
									fontSize: 10,
									fontWeight: 'bold',
								}}
							>
								{lengthCart > 5 ? '5+' : lengthCart}
							</Text>
						</View>
					</View>
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
