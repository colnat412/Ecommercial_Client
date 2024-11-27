import { FlatList, Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Line } from '../../components/Line';

import { colors, style } from '@/src/constants';
import { OrderDetailRouteProp, StackScreenNavigationProp } from '@/src/libs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeaderTitleWithBack } from '../../navigation/components';
import { PaymentProfile } from '../payment';

import { useEffect, useState } from 'react';
import { OrderDetail as OrderDetailType, Product } from '@/src/types';
import { fetchOderDetail } from './handle';
import { ProductList } from '../../components';

export const OrderDetail = () => {
	const route = useRoute<OrderDetailRouteProp>();
	const { order } = route.params;
	const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>();

	const [product, setProduct] = useState<Product[] | null>();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const fetch = async () => {
			const response = await fetchOderDetail(order.id);
			if (response && response.statusCode === 200) {
				setOrderDetail(response.data);
				setLoading(false);
			} else {
				console.log('Error');
			}
		};
		fetch();
	}, []);

	useEffect(() => {
		if (orderDetail) {
			const productTemp: Product[] = [];
			orderDetail.orderItems.map((item) => {
				productTemp.push(item.products);
			});
			setProduct(productTemp);
		}
	}, [orderDetail]);

	return (
		<View style={[style.container, { paddingHorizontal: 0 }]}>
			<HeaderTitleWithBack title="Payment" />
			{loading ? (
				<View style={{flex: 1, justifyContent: 'center'}}>
					<ActivityIndicator color={colors.brand} size={'large'} />
				</View>
			) : (
				<View style={[style.contentBody, { paddingVertical: 0 }]}>
					<View style={styles.priceText}>
						<Text style={{ fontSize: 26, letterSpacing: 3 }}>TOTAL</Text>
						<Text
							style={{
								fontSize: 26,
								fontWeight: 'bold',
								letterSpacing: 3,
								color: colors.brand,
							}}
						>
							{`$ ${orderDetail?.total_price}`}
						</Text>
					</View>
					<Line />
					<PaymentProfile
						full_name={orderDetail?.full_name || ''}
						phone={orderDetail?.phone || ''}
						address={orderDetail?.address || ''}
					/>
					<Line />
					<ProductList products={product || []} onPressCard={() => {}} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	priceText: {
		marginTop: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
