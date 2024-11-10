import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';

import data from '@/dbTest.json';
import { CartItem } from './CartItem';

export const Cart = () => {
	return (
		<FlatList
			data={data.products.slice(0, 3)}
			renderItem={({ item }) => <CartItem product={item} />}
		/>
	);
};
