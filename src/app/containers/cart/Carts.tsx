import { FlatList, Pressable, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { CartItem } from './CartItem';
import { Product } from '@/src/types';
import { useEffect, useState } from 'react';
import { getData } from '../handle';
import { HeaderTitleWithBack } from '../../navigation/components';
import { Line } from '../../components';
import { style } from '@/src/constants';
import { Arrow } from '@/src/assets';

export const Cart = () => {
	const [data, setData] = useState<Product[]>([]);
	useEffect(() => {
		getData({ urlApi: '/products' }).then((data) => {
			setData(data);
		});
	}, []);
	return (
		<View style={{ flex: 1, marginTop: 30, padding: 5 }}>
			<HeaderTitleWithBack title="Carts" />
			<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
				<Checkbox status="checked" />
				<Text style={{ fontWeight: 'bold', opacity: 0.5 }}>
					Select all ({data.length})
				</Text>
			</View>
			<Line />
			<View style={{ flex: 1 }}>
				<FlatList
					data={data}
					renderItem={({ item }) => <CartItem product={item} />}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<Pressable
				style={[
					style.button,
					{
						padding: 14,
						flexDirection: 'row',
						gap: 5,
						marginVertical: 14,
					},
				]}
			>
				<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
					Next
				</Text>
				<Arrow width={20} height={20} color={'white'} />
			</Pressable>
		</View>
	);
};
