import { FlatList, Pressable, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { CartItem } from './CartItem';
import {
	CartItem as CartItemI,
	ListOption,
	Option,
	Product,
} from '@/src/types';
import { useEffect, useState } from 'react';
import { getData, getDataFromDBS } from '../handle';
import { HeaderTitleWithBack } from '../../navigation/components';
import { Line } from '../../components';
import { style } from '@/src/constants';
import { Arrow } from '@/src/assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CartRouteProp, StackScreenNavigationProp } from '@/src/libs';
import { getCartItem, saveProductToCart } from './handle';

export const ShoppingCart = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const route = useRoute<CartRouteProp>();

	const [data, setData] = useState<CartItemI[]>([]);
	const [dataChanged, setDataChanged] = useState<boolean>(false);

	const goPayment = () => {
		navigation.navigate('PaymentOption');
	};

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCartItem();
				const cartItems = response.data.data?.cartItems ?? [];

				if (cartItems.length) {
					const mappedItems = cartItems.map((cartItem: CartItemI) => ({
						id: cartItem.id,
						quantity: cartItem.quantity,
						item: cartItem.item,
						listOptions: cartItem.options.map(
							(option: Option) => option.listOption,
						),
					}));
					setData(mappedItems);
					console.log('Cart items:', mappedItems);
				} else {
					console.warn('No cart items found.');
					setData([]);
				}
			} catch (error) {
				console.error('Error fetching cart items:', error);
			}
		};

		fetchCartItems();
	}, []);

	return (
		<View style={{ flex: 1, marginTop: 30, padding: 5 }}>
			<HeaderTitleWithBack title="Carts" />
			<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
				<Checkbox status="checked" />
				<Text style={{ fontWeight: 'bold', opacity: 0.5 }}>Select all</Text>
			</View>
			<Line />
			<View style={{ flex: 1 }}>
				<FlatList
					data={data}
					renderItem={({ item }) => <CartItem cartItem={item} />}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<Pressable
				onPress={goPayment}
				style={[
					style.button,
					{
						padding: 14,
						flexDirection: 'row',
						gap: 5,
						marginVertical: 14,
					},
				]}
			>
				<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
					Next
				</Text>
				<Arrow width={20} height={20} color={'white'} />
			</Pressable>
		</View>
	);
};
