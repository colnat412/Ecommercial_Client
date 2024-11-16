import { FlatList, Pressable, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';

import data from '@/dbTest.json';
import { CartItem } from './CartItem';
import { Product } from '@/src/types';
import { useEffect, useState } from 'react';
import { getData } from '../handle';
import { HeaderTitleWithBack } from '../../navigation';
import { Line } from '../../components';
import { colors, style } from '@/src/constants';
import { Arrow } from '@/src/assets';

export const Cart = () => {
	const [data, setData] = useState<Product[]>([]);
	useEffect(() => {
		getData({ urlApi: '/products' }).then((data) => {
			setData(data);
		});
	}, []);
	return (
		<View style={{ marginTop: 30, padding: 5 }}>
			<HeaderTitleWithBack title="Carts" />
			<View style={{ padding: 6 }}>
				<View
					style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
				>
					<Checkbox status="checked" />
					<Text style={{ fontWeight: 'bold', opacity: 0.5 }}>
						Select all
					</Text>
				</View>
				<Line />
				<FlatList
					data={data.slice(0, 5)}
					renderItem={({ item }) => <CartItem product={item} />}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<Pressable
				style={[
					style.button,
					{ padding: 12, flexDirection: 'row', gap: 5 },
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
