import { FlatList, Pressable, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { CartItem } from './CartItem';
import { Cart, Product } from '@/src/types';
import { useEffect, useState } from 'react';
import { getData } from '../handle';
import { HeaderTitleWithBack } from '../../navigation/components';
import { Line } from '../../components';
import { style } from '@/src/constants';
import { Arrow } from '@/src/assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CartRouteProp, StackScreenNavigationProp } from '@/src/libs';
import { saveProductToCart } from './handle';
import { getProduct } from '../productDetail';

export const Carts = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const route = useRoute<CartRouteProp>();

	const [data, setData] = useState<Cart[]>([]);
	const [dataChanged, setDataChanged] = useState<boolean>(false);

	const handleNavigation = () => {
		navigation.navigate('PaymentOption');
	};

	useEffect(() => {
		const fetchData = async () => {
			const productId = route.params?.productId;
			try {
				const response = await getProduct(productId ? productId : '');
				if (productId && response && response.data) {
					const cartData = await getData({ urlApi: '/carts' });
					const productExists = cartData.some(
						(item: Product) => item.id === productId,
					);
					// if (productExists) {
					// 	const updatedCartData = cartData.map((item: Cart) => {
					// 		if (item.id === productId) {
					// 			return { ...item, quantity: item.quantity + 1 };
					// 		}
					// 		return item;
					// 	});
					// 	console.log(
					// 		'Updating cart with new quantities:',
					// 		updatedCartData,
					// 	);
					// 	await updateProductInCart(updatedCartData);
					// } else {
					// 	console.log('Saving new product to cart:', response.data);
					// 	await saveProductToCart(response.data);
					// }
					console.log('Saving new product to cart:', response.data);
					await saveProductToCart(response.data);
					const updatedCartData = await getData({ urlApi: '/carts' });
					setData(updatedCartData);
				} else {
					const cartData = await getData({ urlApi: '/carts' });
					setData(cartData);
				}
				// const updatedCartData = await getData({ urlApi: '/carts' });
				// setData(updatedCartData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<View style={{ flex: 1, marginTop: 30, padding: 5 }}>
			<HeaderTitleWithBack title="Carts" />
			<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
				<Checkbox status="checked" />
				<Text style={{ fontWeight: 'bold', opacity: 0.5 }}>
					Select all ({data.length})
				</Text>
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
				onPress={handleNavigation}
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
