import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PaymentProfile } from './PaymentProfile';
import { PaymentMethod } from './PaymentMethod';
import { Line } from '../../components/Line';
import { Cart, CartItem } from '../cart';

import { useNavigation } from '@react-navigation/native';
import { StackScreenNavigationProp } from '@/src/libs';
import { HeaderTitleWithBack } from '../../navigation/components';
import { useEffect, useState } from 'react';
import { Product } from '@/src/types';
import { getData } from '../handle';

export const PaymentOption = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const [data, setData] = useState<Product[]>([]);

	useEffect(() => {
		const fetchData = () => {
			const res = getData({ urlApi: '/carts' });
			res.then((data) => {
				setData(data);
			});
		};
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<HeaderTitleWithBack title="Payment" />
			<ScrollView>
				<View style={styles.priceText}>
					<Text style={{ fontSize: 26, letterSpacing: 3 }}>TOTAL</Text>
					<Text
						style={{ fontSize: 26, fontWeight: 'bold', letterSpacing: 3 }}
					>
						$2.500
					</Text>
				</View>
				<Line />
				<PaymentProfile />
				<Line />
				{/* <Cart /> */}
				<View style={{ flex: 1 }}>
					<FlatList
						data={data}
						renderItem={({ item }) => <CartItem product={item} />}
						keyExtractor={(item) => item.id}
					/>
					<PaymentMethod />
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { marginTop: 32, flexDirection: 'column', gap: 10, flex: 1 },
	priceText: {
		marginTop: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
