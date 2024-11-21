import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Checked from '@/src/assets/svgs/Checked';
import { colors, style } from '@/src/constants';
import Warning from '@/src/assets/svgs/Warning';

export const PaymentResult = () => {
	return (
		<View style={styles.container}>
			<Checked width={80} height={80} />
			<Text
				style={{
					fontSize: 20,
					letterSpacing: 2,
					color: colors.brand,
					fontWeight: 'bold',
				}}
			>
				Order Successful
			</Text>
			<Button
				style={[style.button]}
				mode="contained"
				textColor={colors.textBrand}
			>
				Back to Home
			</Button>
			{/* <Button
				style={[style.button, { backgroundColor: '#FFF' }]}
				mode="contained"
				textColor={'black'}
			>
				View Order Details
			</Button> */}
			<View style={styles.warning}>
				<Warning width={20} height={20} />
				<Text
					style={{
						fontSize: 16,
						color: 'black',
					}}
				>
					For any questions please contact us at test@mail.com
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
		padding: 20,
	},
	warning: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
});
