import { FlatList } from 'react-native';
import { CategoryItem } from './CategoryItem';
import { useEffect, useState } from 'react';
import { getDataFromDBS } from '../handle';
import { Category } from '@/src/types';
import { ErrorContainter } from '../../components';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@/src/constants';

export const Categories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
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
			setIsLoading(false);
		};
		fetch();
	}, []);
	return (
		<>
			{isLoading ? (
				<ActivityIndicator
					size={'large'}
					color={colors.brand}
				></ActivityIndicator>
			) : (
				<>
					{isError ? (
						<ErrorContainter message={errorMessage}></ErrorContainter>
					) : (
						<>
							{categories.length > 0 ? (
								<FlatList
									data={categories}
									renderItem={({ item }) => (
										<CategoryItem category={item} />
									)}
									keyExtractor={(item) => item.id}
									horizontal
									initialNumToRender={5}
									maxToRenderPerBatch={5}
									showsHorizontalScrollIndicator={false}
								/>
							) : (
								<ErrorContainter message="No data"></ErrorContainter>
							)}
						</>
					)}
				</>
			)}
		</>
	);
};
