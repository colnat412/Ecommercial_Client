import { Add, Minus, Star, Trash, User } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { Product } from '@/src/types';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Line } from '../../components';

interface CartItemProps {
	product: Product;
}

export const CartItem = ({ product }: CartItemProps) => {
	return (
		<View style={{ gap: 2 }}>
			<View style={styles.container}>
				<Checkbox status="checked" />
				<Image
					width={100}
					height={100}
					source={{ uri: product.images_url }}
				/>
				<View style={styles.info}>
					<Text style={styles.nameText}>{product.name}</Text>
					<Text numberOfLines={2} style={styles.descriptionText}>
						{product.description}
					</Text>
					<Text style={styles.priceText}>${product.price}</Text>
					<View style={styles.qtyContainer}>
						<Pressable>
							<Minus />
						</Pressable>
						<Text>5</Text>
						<Pressable>
							<Add />
						</Pressable>
					</View>
				</View>
				<Trash color={'red'} width={30} height={30} />
			</View>
			<Line />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 8,
		margin: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	info: {
		justifyContent: 'center',
		gap: 5,
	},
	nameText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	descriptionText: {
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
