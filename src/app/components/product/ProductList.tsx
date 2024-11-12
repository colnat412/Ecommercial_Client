import { Product } from '@/src/types';
import { FlatList } from 'react-native';
import { ProductCard } from './ProductCard';
import { useState } from 'react';

interface ProductListProps {
	products: Product[];
	onPressCard: () => void;
	haveRight?: boolean;
	typeRight?: 'edit' | 'remove';
	onPressButtonRight?: () => void;
	descrtipion?: string;
	price?: number;
}

export const ProductList = ({
	products,
	onPressCard,
	haveRight = false,
	typeRight = 'remove',
	onPressButtonRight = () => {},
	descrtipion = '',
	price = 0,	
}: ProductListProps) => {
	return (
		<FlatList
			data={products}
			renderItem={({ item }) => (
				<ProductCard
					product={item}
					onPressCard={onPressCard}
					haveRight={haveRight}
					typeRight={typeRight}
					onPressButtonRight={onPressButtonRight}
					descrtipion={descrtipion}
					price={price}
				/>
			)}
		/>
	);
};
