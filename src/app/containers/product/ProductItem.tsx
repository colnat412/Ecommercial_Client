import { FlatList, StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';
import { style } from '@/src/constants';
import { ProductItemHorizontal } from '../../components';
import { useEffect, useState } from 'react';
import { Product } from '@/src/types';
import { getData } from '../handle';

export const ProductItem = ({ title }: { title: String }) => {
	const [data, setData] = useState<Product[]>([]);
	useEffect(() => {
		getData({ urlApi: '/products' }).then((data) => {
			setData(data);
		});
	}, []);
	return (
		<View>
			<View style={styles.recommendedStyle}>
				<Text style={[style.headerText, { fontSize: 18, padding: 14 }]}>
					{title}
				</Text>
			</View>
			<FlatList
				data={data.slice(0, 5)}
				renderItem={({ item }) => <ProductItemHorizontal product={item} />}
				keyExtractor={(item) => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	recommendedStyle: {
		flexDirection: 'row',
		gap: 226,
		alignItems: 'center',
	},
});
