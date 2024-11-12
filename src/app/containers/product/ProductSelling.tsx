import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import data from '@/dbTest.json';
import { Text } from 'react-native-paper';
import { colors, style } from '@/src/constants';
import { ProductItemHorizontal } from '../../components';

export const ProductSelling = () => {
	return (
		<View>
			<View style={styles.sellingStyle}>
				<Text style={[style.headerText, { fontSize: 18, padding: 14 }]}>
					Top Selling
				</Text>
			</View>
			<FlatList
				style={{}}
				data={data.products.slice(0, 5)}
				renderItem={({ item }) => <ProductItemHorizontal product={item} />}
				keyExtractor={(item) => item.id}
				nestedScrollEnabled={true}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	sellingStyle: {
		flexDirection: 'row',
		gap: 226,
		alignItems: 'center',
	},
});
