import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { HeaderTitleWithBack } from '../../navigation/components';
import { Product } from '@/src/types';
import { useEffect, useState } from 'react';
import { getData, getDataFromDBS } from '../handle';
import { ProductItem, Products } from '../product';
import { useRoute } from '@react-navigation/native';
import { SubCategoryRouteProp } from '@/src/libs';
import { ProductItemVertical } from '../../components';
import { Text } from 'react-native-paper';
import { colors, style } from '@/src/constants';

export const SubCategory = () => {
	const [product, setProduct] = useState<Product[]>([]);
	const route = useRoute<SubCategoryRouteProp>();

	useEffect(() => {
		const fetch = async () => {
			const response = await getDataFromDBS<Product[]>({
				url: `/api/categories/${route.params.categoryId}`,
			});
			if (response.data && response.statusCode === 200) {
				setProduct(response.data);
			}
		};
		fetch();
	}, []);
	return (
		<View
			style={[style.headerContainer, { backgroundColor: colors.background, flex :1 }]}
		>
			<View style={[style.body, { backgroundColor: colors.background }]}>
				<HeaderTitleWithBack title="Category" />
				<FlatList
					style={{
						backgroundColor: colors.mainBackground,
						paddingBottom: 16,
					}}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					nestedScrollEnabled
					data={product}
					renderItem={({ item, index }) => (
						<ProductItemVertical index={index} product={item} />
					)}
					numColumns={2}
					contentContainerStyle={{ padding: 8, gap: 8 }}
					keyExtractor={(item) => item.id.toString()}
					ListHeaderComponent={
						<>
							<ProductItem
								title={'Top Selling'}
								urlFetch={'/api/products/relation-product'}
							/>
							<ProductItem
								title={'Recommended'}
								urlFetch={'/api/products/relation-product'}
								relation-product
							/>
							<View style={styles.recommendedStyle}>
								<Text
									style={[
										style.headerText,
										{ fontSize: 18, padding: 14 },
									]}
								>
									Products
								</Text>
							</View>
						</>
					}
				/>
			</View>
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
