import { Cart, Star } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { StackScreenNavigationProp } from '@/src/libs';
import { Product } from '@/src/types';
import { formatRating } from '@/src/utils';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface RecommendItemProps {
	product: Product;
}

export const ProductItemVertical = React.memo(
	({ product }: RecommendItemProps) => {
		const navigation = useNavigation<StackScreenNavigationProp>();
		const goProductDetail = () => {
			navigation.navigate('ProductDetail', { productId: product.id });
		};

		return (
			<Pressable onPress={goProductDetail} style={styles.container}>
				<View style={{ width: '100%', height: 200 }}>
					<Image
						source={{ uri: product?.image_url }}
						style={{
							flex: 1,
							borderRadius: 6,
							borderWidth: 2,
							borderColor: colors.outline,
							backgroundColor: colors.outline,
						}}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.info}>
					<View style={styles.child}>
						<Text
							style={{ fontSize: 16, fontWeight: 'bold' }}
							numberOfLines={1}
						>
							{product?.name}
						</Text>
					</View>

					<View style={[styles.child2, {flex: 0}]}>
						<Star width={18} height={18} />
						<Text>{formatRating(product.rating)}</Text>
					</View>
				</View>
				<View style={[styles.info]}>
					<View style={styles.child}>
						<Text style={style.priceText}>{`$ ${product?.price}`}</Text>
					</View>

					<View style={styles.child2}>
						<Cart width={18} height={18} />
						<Text>12.5k</Text>
					</View>
				</View>
			</Pressable>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 4,
		flexDirection: 'column',
		gap: 10,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.outline,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	info: {
		flex: 1,
		// backgroundColor: 'blue',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rating: {
		flexDirection: 'row',
	},
	child: {
		flex: 1,
		gap: 2,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
	},
	child2: {
		flex: 1,
		gap: 2,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});
