import { colors, style } from '@/src/constants';
import { Category, Product } from '@/src/types';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { ErrorContainter, Line, ProductItemVertical } from '../components';
import { HomePageHeader } from '../navigation/components';
import { Banner } from './Banner';
import { Categories } from './category';
import { getDataFromDBS } from './handle';

export const HomePage = () => {
	const [data, setData] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);

	const fetchProduct = async (page: number) => {
		const response = await getDataFromDBS<{
			data: Product[];
			metadata: {
				numberPage: number;
				limit: number;
				totalPage: number;
				totalFavoriteOfPage: number;
			};
		}>({
			url: '/api/products/paginate/' + page,
		});
		if (response.statusCode === 200) {
			setData((prev) => [...prev, ...(response.data?.data ?? [])]);
			setTotal(response.data?.metadata.totalPage ?? 0);
		} else {
			setErrorMessage(response.message);
			setIsError(true);
		}
	};

	const handleLoadMore = () => {
		if (page < total) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		const fetch = async () => {
			const response = await getDataFromDBS<Category[]>({
				url: '/api/categories',
			});
			if (response.statusCode === 200) {
				setCategories(response.data ? response.data : []);
			} else {
				setErrorMessage(response.message);
				setIsError(true);
			}
		};
		fetchProduct(1);
		fetch();
		setLoading(false);
	}, []);

	// useEffect(() => {
	// 	if (page > 1) {
	// 		fetchProduct(page);
	// 	}
	// }, [page]);
	return (
		<View style={{ flex: 1 }}>
			<HomePageHeader />
			<View
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
			>
				{loading ? (
					<ActivityIndicator size="large" color={colors.brand} />
				) : isError ? (
					<ErrorContainter message={errorMessage} />
				) : (
					<FlatList
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						numColumns={2}
						onEndReached={handleLoadMore}
						onEndReachedThreshold={0.7}
						contentContainerStyle={{ gap: 8 }}
						data={data}
						renderItem={({ item }) => (
							<ProductItemVertical product={item} />
						)}
						keyExtractor={(item) => item.id.toString()}
						style={{
							backgroundColor: colors.mainBackground,
							paddingHorizontal: 8,
						}}
						ListFooterComponent={() => (
							<ActivityIndicator size="small" color={colors.brand} />
						)}
						ListHeaderComponent={() => (
							<>
								<Categories categories={categories} />

								<Banner
									title="Fashion"
									subTitle="World have many colors"
									image={require('@/src/assets/images/shoe.png')}
								/>
								<Banner
									title="Skincare"
									subTitle="Love your skin"
									image={require('@/src/assets/images/bottle.png')}
									leftImage
									color="purple"
								/>
								<Line />
								<Text
									style={[
										style.headerText,
										{ fontSize: 16, padding: 12 },
									]}
								>
									Recommended for you
								</Text>
							</>
						)}
					></FlatList>
				)}
			</View>
		</View>
	);
};
