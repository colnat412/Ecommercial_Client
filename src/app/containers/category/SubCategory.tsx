import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { HeaderTitleWithBack } from '../../navigation/components';
import { ProductRecommended, Products, ProductSelling } from '../product';
import { ProductItemVertical } from '../../components';
import { Product } from '@/src/types';
import { useEffect, useState } from 'react';
import { getData } from '../handle';

export const SubCategory = () => {
	const [product, setProduct] = useState<Product[]>([]);
	useEffect(() => {
		getData({ urlApi: '/products' }).then((data) => {
			setProduct(data);
		});
	}, []);
	return (
		<View style={styles.container}>
			<HeaderTitleWithBack title="Category" />
			<ScrollView>
				<ProductSelling />
				<ProductRecommended />
				<Products product={product} />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 32,
	},
});
