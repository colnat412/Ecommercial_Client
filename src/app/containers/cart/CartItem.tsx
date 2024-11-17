import { Add, Minus, Star, Trash, User } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { Product } from '@/src/types';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Line } from '../../components';
import { useState } from 'react';
import { StackScreenNavigationProp, StackScreenRouteProp } from '@/src/libs';
import { useNavigation, useRoute } from '@react-navigation/native';

interface CartItemProps {
	product: Product;
}

export const CartItem = ({ product }: CartItemProps) => {
	const [data, setData] = useState<Product[]>([]);

	const [qty, setQty] = useState<number>(0);
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
					<Text numberOfLines={2} style={styles.listOptionText}>
						Black, Headphone + Wire
					</Text>
					<Text style={styles.priceText}>${product.price}</Text>
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
				<Trash color={'red'} width={30} height={30} />
			</View>
			<Line />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 24,
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
