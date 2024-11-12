import { ScrollView, StyleSheet, View } from 'react-native';

import { HeaderTitleWithBack } from '../../navigation/components';
import { ProductRecommended, ProductSelling } from '../product';
import { Recommended } from '../recommended';

export const SubCategory = () => {
	return (
		<View style={styles.container}>
			<HeaderTitleWithBack title="Category" />
			<ScrollView>
				<ProductSelling />
				<ProductRecommended />
				<Recommended title="All Products" />
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
