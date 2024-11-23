import { Brand, Cart, User } from '@/src/assets';
import { colors, style } from '@/src/constants';
import {
	AppDispatch,
	ScreenTabNavigationProp,
	StackScreenNavigationProp,
	useAppDispatch,
	useAppSelector,
} from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { fetchDetailInformation } from '../../localHandle';
import { setDetailInfomation } from '@/src/libs/redux/store';

export const HomePageHeader = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const navigationTab = useNavigation<ScreenTabNavigationProp>();

	const [lengthCart, setLengthCart] = useState<number>(0);
	const [cardChange, setCardChange] = useState<boolean>(false);

	const detailsInformation = useAppSelector((state) => state.detailInfomation);
	const dispatch = useAppDispatch<AppDispatch>();

	useEffect(() => {
		const fetchData = async () => {
			// const getDetailInformation = await fetchDetailInformation();
			// if (getDetailInformation.statusCode === 200) {
			// 	dispatch(setDetailInfomation(getDetailInformation.data));
			// }
		};
		fetchData();
	}, []);

	const goLogin = () => {
		if (detailsInformation.detailInfomation) {
			navigationTab.navigate('Account');
		} else {
			navigation.navigate('Login');
		}
	};

	const goCart = async () => {
		navigationTab.navigate('Cart');
	};

	return (
		<View style={[style.headerContainer, { backgroundColor: 'white' }]}>
			<View style={[style.rowCenterCenter]}>
				<Brand width={40} height={40} />
				<Text
					style={{
						lineHeight: 40,
						textAlign: 'center',
						fontSize: 30,
						color: colors.brand,
						fontFamily: 'FiraMonoBold',
					}}
				>
					Fontaine
				</Text>
			</View>
			<View style={[style.rowCenter, { gap: 16 }]}>
				<Pressable onPress={goCart}>
					<View
						style={{
							flex: 1,
							position: 'relative',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Cart width={30} height={25} color={colors.cart} />
						<View
							style={{
								position: 'absolute',
								zIndex: 10,
								top: 4,
								right: -8,
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
								uri: detailsInformation.detailInfomation.avatar_url,
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
						<User width={25} height={25} color={'black'} />
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};
