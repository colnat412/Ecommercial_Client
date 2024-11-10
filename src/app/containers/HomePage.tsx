import { ScrollView, View } from 'react-native';

import Category from './category/Category';
import Banner from './Banner';
import { Search } from './Search';
import { Recommended } from './recommended';
import { HomePageHeader } from '../navigation/components';

export const HomePage = () => {
	return (
		<View style={{ flex: 1 }}>
			<HomePageHeader />
			<ScrollView>
				<Category />
				<Banner title="Fashion" subTitle="World have many colors" />
				<Banner title="Food" subTitle="World have many colors" />
				<Recommended />
			</ScrollView>
		</View>
	);
};
