import { FlatList, StyleSheet } from 'react-native';
import { CategoryItem } from './CategoryItem';
import { useEffect, useState } from 'react';
import { Category } from '@/src/types/category';
import { getData } from '../handle';

export const Categories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	useEffect(() => {
		getData({ urlApi: '/categories' }).then((data) => {
			setCategories(data);
		});
	}, []);
	return (
		<FlatList
			data={categories}
			renderItem={({ item }) => <CategoryItem category={item} />}
			keyExtractor={(item) => item.id}
			horizontal
			showsHorizontalScrollIndicator={false}
		/>
	);
};
