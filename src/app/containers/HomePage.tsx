import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { style } from '@/src/constants';
import { ProductItemVertical } from '../components';
import {  useState } from 'react';
import { Product } from '@/src/types';
import { Banner } from './Banner';
import { Categories } from './category/Category';
import { HomePageHeader } from '../navigation/components';



export const HomePage = () => {
	const [data, setData] = useState<Product[]>([]);
	// useEffect(() => {
	// 	getData({ urlApi: '/products' }).then((data) => {
	// 		setData(data);
	// 	});
	// }, []);

	// const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	const fetchHomePage = async () => {
	// 		const responseDetailInfomation = await fetchDetailInformation();
	// 		if (responseDetailInfomation.status === 200) {
	// 			dispatch(
	// 				setDetailInfomation(
	// 					responseDetailInfomation.data
	// 						? responseDetailInfomation.data
	// 						: null,
	// 				),
	// 			);
	// 		} else if (responseDetailInfomation.status === 500) {
	// 			console.log('Error');
	// 		}
	// 	};
	// 	fetchHomePage();
	// }, []);

	return (
		<View style={{ flex: 1 }}>
			<HomePageHeader />
			<FlatList
				numColumns={2}
				data={data}
				renderItem={({ item }) => <ProductItemVertical product={item} />}
				keyExtractor={(item) => item.id.toString()}
				ListHeaderComponent={() => (
					<>
						<Categories />
						<Banner title="Fashion" subTitle="World have many colors" />
						<Banner title="Food" subTitle="World have many colors" />
						<Text
							style={[style.headerText, { fontSize: 16, padding: 12 }]}
						>
							Recommended for you
						</Text>
					</>
				)}
			></FlatList>
		</View>
	);
};
