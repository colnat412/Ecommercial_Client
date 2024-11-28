import { Momo } from '@/src/assets';
import QrCode from '@/src/assets/svgs/Qr';
import { colors, style } from '@/src/constants';
import { Payment } from '@/src/types';
import { useEffect, useRef, useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import {
	createOrder,
	getOrderById,
	getPaymentSuccess,
	postPaymentData,
} from './handle';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenNavigationProp } from '@/src/libs';

interface PaymentMethodProps {
	cartItemIds: string[];
}

export const PaymentMethod = ({ cartItemIds }: PaymentMethodProps) => {
	const navigation = useNavigation<StackScreenNavigationProp>();

	const [momoChecked, setMomoChecked] = useState<boolean>(true);
	const [qrChecked, setQrChecked] = useState<boolean>(false);
	const [paymentData, setPaymentData] = useState<Payment>();

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
			try {
				const response = await createOrder(cartItemIds);
				const orderId = response.data.id;
				const paymentResponse = await postPaymentData(orderId);
				const paymentData = paymentResponse.data;

				if (paymentData) {
					Linking.openURL(paymentData.shortLink);
					timeoutRef.current = setTimeout(async () => {
						const orderStatusResponse = await getOrderById(
							paymentData.requestId,
						);
						if (orderStatusResponse.data.isActive) {
							navigation.navigate('PaymentResult');
						} else {
							console.log('Payment not active yet.');
						}
					}, 3000);
				}
			} catch (error) {
				console.error('Payment error:', error);
			}
		}
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
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
			<Pressable
				onPress={handlePayNow}
				style={[style.button, { padding: 14 }]}
			>
				<Text style={{ color: colors.textBrand, fontWeight: 'bold' }}>
					Pay now
				</Text>
			</Pressable>
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
