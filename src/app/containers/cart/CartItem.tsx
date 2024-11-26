import { Add, Minus, Trash } from '@/src/assets';
import { colors } from '@/src/constants';
import { CartItem as ICartItem } from '@/src/types';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { useState } from 'react';
import { Line } from '../../components';
import { deleteCartItem } from './handle';

interface CartItemProps {
	cartItem: ICartItem;
	isSelected: boolean;
	toggleSelectItem: (id: string) => void;
	onDelete: (id: string) => void;
}

export const CartItem = ({
	cartItem,
	isSelected,
	toggleSelectItem,
	onDelete,
}: CartItemProps) => {
	const [qty, setQty] = useState<number>(cartItem.quantity);

	const handleAddQty = () => setQty(qty + 1);
	const handleMinusQty = () => qty > 0 && setQty(qty - 1);

	const calculateTotalPrice = () => {
		const priceTotal =
			cartItem.item.price +
			cartItem.options.reduce(
				(sum, option) => sum + option.listOption.adjustPrice,
				0,
			);
		return priceTotal.toFixed(2);
	};

	return (
		<View style={{ gap: 2 }}>
			<View style={styles.container}>
				<Checkbox
					onPress={() => toggleSelectItem(cartItem.id)}
					status={isSelected ? 'checked' : 'unchecked'}
				/>
				<Image
					width={100}
					height={100}
					source={{ uri: cartItem.item.image_url }}
				/>
				<View style={styles.info}>
					<Text style={styles.nameText}>{cartItem.item.name}</Text>
					<Text numberOfLines={2} style={styles.listOptionText}>
						{cartItem.options
							.map((option) => option.listOption.name)
							.join(', ')}
					</Text>
					<Text style={styles.priceText}>${calculateTotalPrice()}</Text>
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
				<Pressable onPress={() => onDelete(cartItem.id)}>
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
