import { Home, User } from '@/src/assets';
import { Phone } from '@/src/assets/svgs/Phone';
import { useAppSelector } from '@/src/libs';
import { DetailInformation } from '@/src/types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface PaymentProfileProps {
	full_name: string;
	phone: string;
	address: string;
}

export const PaymentProfile = ({full_name, phone, address}: PaymentProfileProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.info}>
				<User width={20} height={20} />
				<Text>{full_name}</Text>
			</View>
			<View style={styles.info}>
				<Home width={20} height={20} />
				<Text style={{ letterSpacing: 1 }}>
					{address}
				</Text>
			</View>
			<View style={styles.info}>
				<Phone width={20} height={20} />
				<Text style={{ letterSpacing: 1 }}>{phone}</Text>
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
