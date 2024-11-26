import { Momo } from '@/src/assets';
import QrCode from '@/src/assets/svgs/Qr';
import { colors, style } from '@/src/constants';
import { Payment } from '@/src/types';
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import { getPaymentSuccess, postPaymentData } from './handle';
import { useNavigation } from '@react-navigation/native';
import { StackScreenNavigationProp } from '@/src/libs';

export const PaymentMethod = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();

	const [momoChecked, setMomoChecked] = useState<boolean>(true);
	const [qrChecked, setQrChecked] = useState<boolean>(false);
	const [paymentData, setPaymentData] = useState<Payment>();

	const handleChooseQr = () => {
		setQrChecked(true);
		setMomoChecked(false);
	};
	const handleChooseMomo = () => {
		setMomoChecked(true);
		setQrChecked(false);
	};

	const handlePayNow = async () => {
		if (momoChecked) {
			if (paymentData?.shortLink) {
				Linking.openURL(paymentData.shortLink);
				const response = await getPaymentSuccess();
				if (response.statusCode === 200) {
					navigation.navigate('PaymentResult');
				}
			}
		}
	};

	const checkPaymentSuccess = async () => {
		try {
			const response = await getPaymentSuccess();
			console.log('Payment data:', response);
			if (response.statusCode === 200) {
				navigation.navigate('PaymentResult');
			}
		} catch (error) {
			console.error('Error fetching payment data:', error);
		}
	};

	useEffect(() => {
		const fetchPaymentData = async () => {
			try {
				const response = await postPaymentData('3');
				setPaymentData(response.data);
				console.log('Payment data:', paymentData);
			} catch (error) {
				console.error('Error fetching payment data:', error);
			}
		};
		fetchPaymentData();
	}, []);

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
				onPress={handlePayNow}
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
