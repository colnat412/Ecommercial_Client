import {
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Search } from '../Search';
import data from '@/dbTest.json';

import { colors, style } from '@/src/constants';

import { HeaderTitleWithBack } from '../../navigation/components';
import { ProductRecommended, Products, ProductSelling } from '../product';
import { Recommended } from '../recommended';

export const SubCategory = () => {
	return (
		<View style={styles.container}>
			<HeaderTitleWithBack title="Category" />
			<ScrollView>
				<ProductSelling />
				<ProductRecommended />
				<Recommended />
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
