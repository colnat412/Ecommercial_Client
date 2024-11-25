import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PaymentProfile } from './PaymentProfile';
import { PaymentMethod } from './PaymentMethod';
import { PaymentCartItem } from './PaymentCartItem';

import { Line } from '../../components/Line';
import { HeaderTitleWithBack } from '../../navigation/components';
import { useEffect, useState } from 'react';
import { CartItem } from '@/src/types';
import { getData } from '../handle';
import { useRoute } from '@react-navigation/native';
import { PaymentOptionRouteProp } from '@/src/libs';

export const PaymentOption = () => {
	const route = useRoute<PaymentOptionRouteProp>();
	const [data, setData] = useState<CartItem[]>([]);

	useEffect(() => {
		const fetchData = () => {
			const cartItems = route.params.selectedItems;
			setData(cartItems);
		};
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<HeaderTitleWithBack title="Payment" />
			<View style={{ flex: 1, paddingHorizontal: 20 }}>
				<View style={styles.priceText}>
					<Text style={{ fontSize: 26, letterSpacing: 3 }}>TOTAL</Text>
					<Text
						style={{ fontSize: 26, fontWeight: 'bold', letterSpacing: 3 }}
					>
						${route.params.totalPrice}
					</Text>
				</View>
				<Line />
				<PaymentProfile />
				<Line />
				{/* <Cart /> */}
				<View style={{ flex: 1 }}>
					<FlatList
						data={data}
						renderItem={({ item }) => <PaymentCartItem cartItem={item} />}
					/>
				</View>
				<PaymentMethod />
			</View>
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
