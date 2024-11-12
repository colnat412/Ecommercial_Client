import data from '@/dbTest.json';
import { FlatList, StyleSheet } from 'react-native';
import { CategoryItem } from './CategoryItem';

export const Category = () => {
	return (
		<FlatList
			data={data.categories}
			renderItem={({ item }) => <CategoryItem category={item} />}
			keyExtractor={(item) => item.id}
			horizontal
			showsHorizontalScrollIndicator={false}
		/>
	);
};
