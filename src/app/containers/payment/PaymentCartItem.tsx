import { Image, StyleSheet, View } from 'react-native';

import { CartItem } from '@/src/types';
import { colors } from '@/src/constants';
import { Text } from 'react-native-paper';

import { Line } from '../../components';

interface PaymentCartItemProps {
	cartItem: CartItem;
}

export const PaymentCartItem = ({ cartItem }: PaymentCartItemProps) => {
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
				</View>
				<Text style={styles.qtyText}>x{cartItem.quantity}</Text>
			</View>
			<Line />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		margin: 8,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	info: {
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
	qtyText: {
		opacity: 0.5,
		fontSize: 16,
	},
});
