import { Star } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { Product } from '@/src/types';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Line } from '../Line';

interface CartItemProps {
	product: Product;
}

export const CartItem = ({ product }: CartItemProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.item}>
				<Image
					width={100}
					height={100}
					source={{ uri: product.images_url }}
				/>
				<View style={{ gap: 5 }}>
					<Text style={styles.textName}>{product.name}</Text>
					<Text style={{ fontSize: 12, opacity: 0.5 }}>
						Black, Headphone + Wire
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'column',
						alignItems: 'flex-end',
						gap: 5,
					}}
				>
					<Text style={styles.textPrice}>${product.price}</Text>
					<Text style={styles.textQty}>x1</Text>
				</View>
			</View>
			<Line />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 5,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: 8,
	},
	textName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	textPrice: {
		fontSize: 16,
		fontWeight: 'bold',
		color: colors.brand,
	},
	textQty: {
		fontSize: 12,
		opacity: 0.5,
	},
});
