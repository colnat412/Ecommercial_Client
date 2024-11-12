import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { HeaderTitleWithBack } from '../../navigation/components';
import { Product } from '@/src/types';
import { useEffect, useState } from 'react';
import { getData } from '../handle';
import { ProductItem, Products } from '../product';

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
				<ProductItem title={'Top Selling'} />
				<ProductItem title={'Recommended'} />
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
