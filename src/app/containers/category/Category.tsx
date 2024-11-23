import { FlatList } from 'react-native';
import { CategoryItem } from './CategoryItem';
import { useEffect, useState } from 'react';
import { getDataFromDBS } from '../handle';
import { Category } from '@/src/types';
import { ErrorContainter } from '../../components';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@/src/constants';

interface CategoriesProps {
	categories: Category[];
}

export const Categories = ({ categories }: CategoriesProps) => {
	return (
		<FlatList
			data={categories}
			renderItem={({ item }) => <CategoryItem category={item} />}
			keyExtractor={(item) => item.id}
			horizontal
			initialNumToRender={5}
			maxToRenderPerBatch={5}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				gap: 16,
			}}
		/>
	);
};
