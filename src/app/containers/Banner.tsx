import { colors } from '@/src/constants';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface BannerProps {
	title: string;
	subTitle: string;
	leftImage?: boolean;
	color?: string;
	image: ImageSourcePropType;
}

export const Banner = ({
	title,
	subTitle,
	leftImage = false,
	color = colors.brand,
	image,
}: BannerProps) => {
	return (
		<View
			style={[
				styles.container,
				{
					flexDirection: leftImage ? 'row-reverse' : 'row',
					backgroundColor: color,
				},
			]}
		>
			<View style={styles.text}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subTitle}>{subTitle}</Text>
			</View>
			<View style={{ padding: 8 }}>
				<Image
					style={{ width: 108, height: 108, resizeMode: 'contain' }}
					source={image}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.brand,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 40,
		borderRadius: 5,
		paddingHorizontal: 30,
		marginVertical: 8,
	},
	text: {
		padding: 20,
		flexDirection: 'column',
		gap: 5,
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: colors.background
	},
	subTitle: {
		opacity: 0.5,
		fontSize: 14,
		color: colors.mainBackground,
	},
});
