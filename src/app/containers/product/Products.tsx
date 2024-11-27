import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import {  style } from '@/src/constants';
import { ProductItemVertical } from '../../components';
import { Product } from '@/src/types';

interface ProductProps {
	product: Product[];
}

export const Products = ({ product }: ProductProps) => {
	return (
		<>
			<View style={styles.recommendedStyle}>
				<Text
					style={[
						style.headerText,
						{ fontSize: 18, paddingHorizontal: 14, paddingVertical: 9 },
					]}
				>
					All Products
				</Text>
			</View>
			<FlatList
			nestedScrollEnabled
				numColumns={2}
				data={product}
				renderItem={({ item, index }) => <ProductItemVertical product={item}  index={index}/>}
			></FlatList>
		</>
	);
};

const styles = StyleSheet.create({
	recommendedStyle: {
		flexDirection: 'row',
		gap: 226,
		alignItems: 'center',
	},
});
