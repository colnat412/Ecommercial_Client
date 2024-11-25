import { Momo } from '@/src/assets';
import QrCode from '@/src/assets/svgs/Qr';
import { colors, style } from '@/src/constants';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';

export const PaymentMethod = () => {
	const [momoChecked, setMomoChecked] = useState<boolean>(true);
	const handleChooseMomo = () => {
		setMomoChecked(true);
		setQrChecked(false);
	};
	const [qrChecked, setQrChecked] = useState<boolean>(false);
	const handleChooseQr = () => {
		setQrChecked(true);
		setMomoChecked(false);
	};
	return (
		<View style={styles.container}>
			<View style={styles.method}>
				<View style={styles.subMethod}>
					<Momo width={38} height={38} />
					<Text style={styles.textMethod}>Momo</Text>
				</View>
				<RadioButton
					onPress={handleChooseMomo}
					status={momoChecked ? 'checked' : 'unchecked'}
					color={colors.brand}
					value="momo"
				/>
			</View>
			<View style={styles.method}>
				<View style={styles.subMethod}>
					<QrCode width={38} height={38} />
					<Text style={styles.textMethod}>QR Code</Text>
				</View>
				<RadioButton
					onPress={handleChooseQr}
					color={colors.brand}
					value="momo"
					status={qrChecked ? 'checked' : 'unchecked'}
				/>
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
		paddingVertical: 20,
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
