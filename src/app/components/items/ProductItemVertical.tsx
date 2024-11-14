import { Cart, Star } from '@/src/assets';
import { style } from '@/src/constants';
import { StackScreenNavigationProp } from '@/src/libs';
import { Product } from '@/src/types';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface RecommendItemProps {
	product: Product;
}

export const ProductItemVertical = ({ product }: RecommendItemProps) => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	return (
		<Pressable
			onPress={() => {
				navigation.navigate('ProductDetail');
			}}
			style={styles.container}
		>
			<View style={{ padding: 5 }}>
				<Image
					style={{ width: 150, height: 150 }}
					source={{ uri: product?.images_url }}
				/>
			</View>
			<View style={styles.info}>
				<View>
					<Text style={{ width: '100%' }}>{product?.name}</Text>
				</View>

				<View style={styles.rating}>
					<Star width={18} height={18} />
					<Text>4.5</Text>
				</View>
			</View>
			<View style={styles.info}>
				<View>
					<Text style={style.priceText}>${product?.price}</Text>
				</View>

				<View style={styles.rating}>
					<Cart width={18} height={18} />
					<Text>12.5k</Text>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginVertical: 10,
		flexDirection: 'column',
		gap: 10,
		width: '45%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2%',
		borderRadius: 6,
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
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	price: {},
});
