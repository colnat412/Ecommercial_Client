import QrCode from '@/src/assets/Qr';
import Momo from '@/src/assets/svgs/Momo';
import { colors, style } from '@/src/constants';
import { StyleSheet, View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';

export const PaymentMethod = () => {
	return (
		<View style={styles.container}>
			<View style={styles.method}>
				<View style={styles.subMethod}>
					<Momo width={38} height={38} />
					<Text style={styles.textMethod}>Momo</Text>
				</View>
				<RadioButton status="checked" color={colors.brand} value="momo" />
			</View>
			<View style={styles.method}>
				<View style={styles.subMethod}>
					<QrCode width={38} height={38} />
					<Text style={styles.textMethod}>QR Code</Text>
				</View>
				<RadioButton color={colors.brand} value="momo" />
			</View>
			<Button
				style={[style.button]}
				mode="contained"
				textColor={colors.textBrand}
			>
				Pay now
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		gap: 10,
		padding: 20,
	},
	method: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 0.5,
		padding: 10,
		borderRadius: 5,
		borderColor: '#c2c2c2',
	},
	subMethod: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	textMethod: {
		fontSize: 16,
		fontWeight: 'semibold',
	},
});
