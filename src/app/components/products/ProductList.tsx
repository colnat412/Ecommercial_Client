import { Product } from '@/src/types';
import { FlatList, StyleProp, ViewStyle } from 'react-native';
import { ProductCard, ProductCardProps } from './ProductCard';

interface ProductListProps extends Omit<ProductCardProps, 'product'> {
	style?: StyleProp<ViewStyle>;
	products: Product[];
}

export const ProductList = ({
	style,
	products,
	onPressCard,
	componentRight = null,
	onPressButtonRight = () => {},
}: ProductListProps) => {
	return (
		<FlatList
			style={[style, { paddingVertical: 4 }]}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			data={products}
			renderItem={({ item }) => (
				<ProductCard
					product={item}
					onPressCard={onPressCard}
					componentRight={componentRight}
					onPressButtonRight={onPressButtonRight}
					description={item.description}
					price={item.price}
				/>
			)}
		/>
	);
};
