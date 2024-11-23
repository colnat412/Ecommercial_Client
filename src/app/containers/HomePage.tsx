import { colors, style } from '@/src/constants';
import { Product } from '@/src/types';
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
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		const fetch = async () => {
			const response = await getDataFromDBS<Product[]>({
				url: '/api/products',
			});
			if (response.statusCode === 200) {
				setData(response.data ? response.data : []);
			}else {
				setErrorMessage(response.message);
				setIsError(true);
			}
			setLoading(false);
		};
		fetch();
	}, []);
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
						ListHeaderComponent={() => (
							<>
								<Categories />

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
									color='purple'
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
