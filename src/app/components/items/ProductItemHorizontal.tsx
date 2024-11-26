import { Star } from '@/src/assets';
import { style } from '@/src/constants';
import { StackScreenNavigationProp } from '@/src/libs';
import { Product } from '@/src/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface ProductItemProps {
	product: Product;
}

export const ProductItemHorizontal = React.memo(({ product }: ProductItemProps) => {
	const navigation = useNavigation<StackScreenNavigationProp>();

	return (
		<Pressable
			onPress={() => {
				navigation.navigate('ProductDetail', { productId: product.id });
			}}
			style={styles.container}
		>
			<View style={styles.imgContainer}>
				<Image
					style={{ width: 140, height: 140 }}
					source={{ uri: product?.image_url }}
				/>
			</View>
			<Text style={{ width: '100%', fontWeight: 'bold' }}>
				{product?.name}
			</Text>
			<View style={styles.info}>
				<View>
					<Text style={style.priceText}>${product?.price}</Text>
				</View>
				<View style={styles.rating}>
					<Star width={18} height={18} />
					<Text>{product.rating}</Text>
				</View>
			</View>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		gap: 10,
		padding: 10,
		marginRight: 4,
		marginLeft: 8,
		marginBottom: 3,
		borderRadius: 6,
		backgroundColor: '#FFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	imgContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		height: 150,
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	price: {},
});
