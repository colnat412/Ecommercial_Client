import { colors } from '@/src/constants';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface BannerProps {
	title: string;
	subTitle: string;
}

const Banner = ({ title, subTitle }: BannerProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.text}>
				<Text style={styles.textStyle}>{title}</Text>
				<Text style={styles.textSecond}>{subTitle}</Text>
			</View>
			<Image
				style={{ width: 108, height: 108 }}
				source={require('@/src/assets/image.png')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 5,
		padding: 10,
		margin: 10,
	},
	text: {
		padding: 20,
		flexDirection: 'column',
		gap: 5,
	},
	textStyle: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	textSecond: {
		opacity: 0.5,
		fontSize: 12,
	},
});

export default Banner;
