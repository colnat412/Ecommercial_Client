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
import { CartItem, DetailInformation } from '@/src/types';

export const HomePageHeader = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const navigationTab = useNavigation<ScreenTabNavigationProp>();

	const detailsInformation: DetailInformation | null = useAppSelector(
		(state) => state.detailInfomation?.detailInfomation ?? null,
	);
	const cart: CartItem[] | null = useAppSelector(
		(state) => state.cart?.cartItem ?? null,
	);
	const dispatch = useAppDispatch<AppDispatch>();

	const goLogin = () => {
		if (detailsInformation) {
			navigationTab.navigate('Account');
		} else {
			navigation.navigate('Login');
		}
	};

	const goCart = async () => {};

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
						{cart && (
							<View
								style={{
									color: 'white',
									fontSize: 10,
									fontWeight: 'bold',
								}}
							>
								<Text
									style={{
										color: 'white',
										fontSize: 10,
										fontWeight: 'bold',
									}}
								>
									{cart ? cart.length : 0}
								</Text>
							</View>
						)}
					</View>
				</Pressable>
				<TouchableOpacity onPress={goLogin}>
					{detailsInformation ? (
						<Image
							source={{
								uri: detailsInformation.avatar_url,
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
