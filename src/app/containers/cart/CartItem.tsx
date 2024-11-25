import { Add, Minus, Trash } from '@/src/assets';
import { colors } from '@/src/constants';
import { CartItem as ICartItem } from '@/src/types';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Line } from '../../components';
import { useState } from 'react';
import { getProduct } from '../productDetail';
import { deleteProductInCart } from './handle';

interface CartItemProps {
	cartItem: ICartItem;
}

export const CartItem = ({ cartItem }: CartItemProps) => {
	const [qty, setQty] = useState<number>(cartItem.quantity);
	const handleAddQty = () => {
		let newQty = qty + 1;
		setQty(newQty);
	};

	const handleMinusQty = () => {
		if (qty > 0) {
			let newQty = qty - 1;
			setQty(newQty);
		}
	};

	const deleteCartItem = async (id: string) => {
		const cartItemDelete = await getProduct(id);
		console.log('cartItemDelete:', cartItemDelete);

		if (cartItemDelete && cartItemDelete.data) {
			await deleteProductInCart(cartItemDelete.data.id);
			Alert.alert('Success', 'Delete Success');
		}
	};

	return (
		<View style={{ gap: 2 }}>
			<View style={styles.container}>
				<Checkbox status="checked" />
				<Image
					width={100}
					height={100}
					source={{ uri: cartItem.item.image_url }}
				/>
				<View style={styles.info}>
					<Text style={styles.nameText}>{cartItem.item.name}</Text>
					<Text numberOfLines={2} style={styles.listOptionText}>
						{cartItem.listOptions.map((option) => option.name).join(', ')}
					</Text>
					<Text style={styles.priceText}>${cartItem.item.price}</Text>
					<View style={styles.qtyContainer}>
						<Pressable onPress={handleMinusQty}>
							<Minus />
						</Pressable>
						<Text>{qty}</Text>
						<Pressable onPress={handleAddQty}>
							<Add />
						</Pressable>
					</View>
				</View>
				<Pressable onPress={() => deleteCartItem(cartItem.id)}>
					<Trash color={'red'} width={30} height={30} />
				</Pressable>
			</View>
			<Line />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 16,
		margin: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	info: {
		flex: 1,
		justifyContent: 'center',
		gap: 5,
	},
	nameText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	listOptionText: {
		fontSize: 13,
		opacity: 0.5,
		maxWidth: 200,
	},
	priceText: {
		color: colors.brand,
		fontWeight: 'bold',
		fontSize: 16,
	},
	qtyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
});
