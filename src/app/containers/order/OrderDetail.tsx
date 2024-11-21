import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Line } from '../../components/Line';

import { useNavigation, useRoute } from '@react-navigation/native';
import { OrderDetailRouteProp, StackScreenNavigationProp } from '@/src/libs';
import { HeaderTitleWithBack } from '../../navigation/components';
import { PaymentProfile } from '../payment';
import { style } from '@/src/constants';

import { ProductList } from '../../components';

export const OrderDetail = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const route = useRoute<OrderDetailRouteProp>();
	const { order } = route.params;
	console.log(order);
	return (
		<View style={[style.container, { paddingHorizontal: 0 }]}>
			<HeaderTitleWithBack title="Payment" />
			<FlatList
				data={null}
				renderItem={({ item }) => <></>}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View style={[style.contentBody, { paddingVertical: 0 }]}>
						<View style={styles.priceText}>
							<Text style={{ fontSize: 26, letterSpacing: 3 }}>
								TOTAL
							</Text>
							<Text
								style={{
									fontSize: 26,
									fontWeight: 'bold',
									letterSpacing: 3,
								}}
							>
								$2.500
							</Text>
						</View>
						<Line />
						<PaymentProfile />
						<Line />
						{/* <ProductList
							products={{}}
							onPressCard={() => {}}
						/> */}
					</View>
				}
			></FlatList>
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
