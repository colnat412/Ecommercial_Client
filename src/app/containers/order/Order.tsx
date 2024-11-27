import { colors, style } from '@/src/constants';
import { AppDispatch, RootState, StackScreenNavigationProp, useAppDispatch, useAppSelector } from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { HeaderTitleWithBack } from '../../navigation/components';
import { Order } from '@/src/types';
import { parseDate } from '@/src/utils';

export const OrderComponent = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const orders:Order[] |null = useAppSelector((state: RootState) => state.order.orders);


	const onOrderPress = (order: Order) => {
		navigation.navigate('OrderDetail', { order: order });
	}

	return (
		<View style={[style.container, style.body, { paddingHorizontal: 0 }]}>
			<HeaderTitleWithBack showCart={false} showUser={false} title="Order" />
			<FlatList
				data={orders}
				renderItem={({ item }) => (
					<OrderItem order={item} onPress={onOrderPress} />
				)}
				style={{ paddingHorizontal: 8, paddingVertical: 5 }}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				initialNumToRender={5}
			></FlatList>
		</View>
	);
};

interface OrderItemProps {
	order: Order;
	onPress?: (order: Order) => void;
}

const OrderItem = ({ order, onPress }: OrderItemProps) => {
	return (
		<Pressable
			onPress={() => {
				onPress ? onPress(order) : {};
			}}
			style={[
				style.outline,
				{
					flex: 1,
					padding: 10,
					marginVertical: 5,
					backgroundColor: colors.background,
				},
			]}
		>
			<View style={{ flex: 1 }}>
				<Text style={[{ fontWeight: 'bold', fontSize: 16 }]}>
					{parseDate(order.order_date)}
				</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Text style={{ fontSize: 12, color: colors.secondText }}>
					{order.itemCount} items
				</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Text style={[style.priceText]}>${order.total_price}</Text>
			</View>
		</Pressable>
	);
};
