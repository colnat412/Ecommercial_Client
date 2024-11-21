import { Image, StyleSheet, View } from 'react-native';

import { Cart } from '@/src/types';
import { colors } from '@/src/constants';
import { Text } from 'react-native-paper';

import { Line } from '../../components';

interface PaymentCartItemProps {
	cartItem: Cart;
}

export const PaymentCartItem = ({ cartItem }: PaymentCartItemProps) => {
	return (
		<View style={{ gap: 2 }}>
			<View style={styles.container}>
				<Image width={100} height={100} source={{ uri: cartItem.image }} />
				<View style={styles.info}>
					<Text style={styles.nameText}>{cartItem.name}</Text>
					<Text numberOfLines={2} style={styles.listOptionText}>
						Black, Headphone + Wire
					</Text>
					<Text style={styles.priceText}>${cartItem.price}</Text>
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
