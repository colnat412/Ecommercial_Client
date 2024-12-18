import { useState, useEffect } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { CartItem } from './CartItem';
import { CartItem as CartItemI, Option } from '@/src/types';
import { HeaderTitleWithBack } from '../../navigation/components';
import { Line } from '../../components';
import { style } from '@/src/constants';
import { Arrow } from '@/src/assets';
import { useNavigation } from '@react-navigation/native';
import { deleteCartItem, getCartItem } from './handle';

interface CartResponse {
	shoppingCart: CartItemI[];
	cartItems: CartItemI[];
}

export const ShoppingCart = () => {
	const navigation = useNavigation();
	const [data, setData] = useState<CartItemI[]>([]);
	const [dataChanged, setDataChanged] = useState<boolean>(false);

	const [selectedItems, setSelectedItems] = useState<CartItemI[]>([]);
	const [selectAll, setSelectAll] = useState<boolean>(false);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCartItem();
				const cartItems: CartItemI[] = response.data.data?.cartItems ?? [];

				const mappedItems = cartItems.map((cartItem: CartItemI) => {
					const itemPrice =
						cartItem.item.price +
						cartItem.options
							.map((option) => option.listOption.adjustPrice)
							.reduce((sum, adjustPrice) => sum + adjustPrice, 0);

					const totalPrice = itemPrice * cartItem.quantity;

					return {
						id: cartItem.id,
						quantity: cartItem.quantity,
						item: cartItem.item,
						priceTotal: totalPrice,
						options: cartItem.options,
						listOptions: cartItem.options.map(
							(option) => option.listOption,
						),
					};
				});

				const grandTotal = mappedItems.reduce(
					(sum, item) => sum + item.priceTotal,
					0,
				);

				console.log('Grand Total:', grandTotal); // Tổng giá tất cả CartItem
				setDataChanged(true);
				setData(mappedItems);
			} catch (error) {
				console.error('Error fetching cart items:', error);
			}
		};
		fetchCartItems();
	}, [dataChanged]);

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectedItems([]);
		} else {
			setSelectedItems(data.map((item) => item));
		}
		setSelectAll(!selectAll);
	};

	const toggleSelectItem = (id: string) => {
		setSelectedItems((prev) =>
			prev.some((item) => item.id === id)
				? prev.filter((item) => item.id !== id)
				: [...prev, data.find((item) => item.id === id)!],
		);
	};

	const handleDeleteCartItem = async (id: string) => {
		try {
			const response = await deleteCartItem(id);
			if (response.status === 200) {
				setData((prev) => prev.filter((item) => item.id !== id));
				Alert.alert('Success', 'Item has been deleted');
			} else {
				Alert.alert('Error', 'Failed to delete item');
			}
		} catch (error) {
			console.error('Error deleting cart item:', error);
		}
	};

	const handleDeleteAll = async () => {
		if (selectedItems.length === 0) {
			Alert.alert('Warning', 'Please select items to delete');
		} else {
			try {
				const response = await Promise.all(
					selectedItems.map((item) => deleteCartItem(item.id)),
				);
				if (response.every((res) => res.status === 200)) {
					setData((prev) =>
						prev.filter(
							(item) =>
								!selectedItems.some(
									(selectedItem) => selectedItem.id === item.id,
								),
						),
					);
					setSelectedItems([]);
					setSelectAll(false);
					Alert.alert('Success', 'All items have been deleted');
				} else {
					Alert.alert('Error', 'Failed to delete items');
				}
			} catch (error) {
				console.error('Error deleting cart items:', error);
			}
		}
	};

	const goPayment = () => {
		const totalPrice = calculateTotalPrice(selectedItems);
		navigation.navigate('PaymentOption', {
			selectedItems,
			totalPrice,
		});
	};

	const calculateTotalPrice = (items: CartItemI[]) => {
		return items.reduce((total, item) => {
			const itemPrice =
				item.item.price +
				item.options.reduce(
					(sum, option) => sum + option.listOption.adjustPrice,
					0,
				);
			return total + itemPrice * item.quantity;
		}, 0);
	};

	return (
		<View style={{ flex: 1, marginTop: 30, padding: 5 }}>
			<HeaderTitleWithBack title="Carts" />
			<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
				<Checkbox
					onPress={handleSelectAll}
					status={selectAll ? 'checked' : 'unchecked'}
				/>
				<Text style={{ fontWeight: 'bold', opacity: 0.5 }}>Select all</Text>
			</View>
			<Line />
			<View style={{ flex: 1 }}>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<CartItem
							cartItem={item}
							isSelected={selectedItems.some(
								(selectedItem) => selectedItem.id === item.id,
							)}
							toggleSelectItem={toggleSelectItem}
							onDelete={handleDeleteCartItem}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					gap: 10,
					alignItems: 'center',
				}}
			>
				<View style={{ maxWidth: 300, flexDirection: 'row' }}>
					<Text style={{ fontSize: 16 }}>Total:</Text>
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
						${calculateTotalPrice(selectedItems).toFixed(2)}
					</Text>
				</View>

				<Pressable
					onPress={handleDeleteAll}
					style={[
						style.button,
						{
							padding: 14,
							flexDirection: 'row',
							gap: 5,
							marginVertical: 14,
							backgroundColor: 'red',
							width: '30%',
						},
					]}
				>
					<Text
						style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
					>
						Delete
					</Text>
				</Pressable>
				<Pressable
					onPress={goPayment}
					style={[
						style.button,
						{
							padding: 14,
							flexDirection: 'row',
							gap: 5,
							marginVertical: 14,
							width: '35%',
						},
					]}
				>
					<Text
						style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
					>
						Check Out
					</Text>
					<Arrow width={20} height={20} color={'white'} />
				</Pressable>
			</View>
		</View>
	);
};
