import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import data from '@/dbTest.json';
import { Text } from 'react-native-paper';
import { colors, style } from '@/src/constants';
import { ProductItem } from '../../components/items/ProductItemHorizontal';

export const ProductRecommended = () => {
	return (
		<View>
			<View style={styles.recommendedStyle}>
				<Text style={[style.headerText, { fontSize: 18, padding: 14 }]}>
					Recommend
				</Text>
				<Pressable>
					<Text style={{ color: colors.brand, fontWeight: 'bold' }}>
						See all
					</Text>
				</Pressable>
			</View>
			<FlatList
				style={{}}
				data={data.products.slice(0, 5)}
				renderItem={({ item }) => <ProductItem product={item} />}
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
