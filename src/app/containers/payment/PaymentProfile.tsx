import { Home, User } from '@/src/assets';
import { Phone } from '@/src/assets/svgs/Phone';
import { useAppSelector } from '@/src/libs';
import { DetailInformation } from '@/src/types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const PaymentProfile = () => {
	const detailInformation: DetailInformation | null = useAppSelector(
		(state) => state.detailInfomation?.detailInfomation || null,
	);
	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<User width={20} height={20} />
				<Text>{detailInformation?.full_name}</Text>
			</View>
			<View style={styles.info}>
				<Home width={20} height={20} />
				<Text style={{ letterSpacing: 1 }}>
					{detailInformation?.address}
				</Text>
			</View>
			<View style={styles.info}>
				<Phone width={20} height={20} />
				<Text style={{ letterSpacing: 1 }}>{detailInformation?.phone}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		gap: 5,
		padding: 16,
	},
	info: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
});
