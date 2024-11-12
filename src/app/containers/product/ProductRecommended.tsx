import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import data from '@/dbTest.json';
import { Text } from 'react-native-paper';
import { colors, style } from '@/src/constants';
import { ProductItemHorizontal } from '../../components';

export const ProductRecommended = () => {
	return (
		<View>
			<View style={styles.recommendedStyle}>
				<Text style={[style.headerText, { fontSize: 18, padding: 14 }]}>
					Recommend
				</Text>
			</View>
			<FlatList
				data={data.products.slice(0, 5)}
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
