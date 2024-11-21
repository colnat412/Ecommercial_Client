import { colors, style } from '@/src/constants';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

interface ChatProps {
	message: string;
	image: string;
	sender: 'sending' | 'receiving';
	// sender = me
}

export const ChatComponent = ({ message, image, sender }: ChatProps) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'flex-end',
				justifyContent: 'flex-end',
				flexDirection: sender === 'sending' ? 'row' : 'row-reverse',
				gap: 10,
				marginVertical: 5,
			}}
		>
			<View
				style={{
					backgroundColor:
						sender === 'sending' ? colors.brand : colors.rateLine,
					paddingHorizontal: 8,
					paddingVertical: 10,
					borderRadius: 8,
					maxWidth: '60%',
				}}
			>
				<Text
					style={{
						fontSize: 16,
						color:
							sender === 'sending' ? colors.textBrand : colors.disable,
					}}
				>
					{message}
				</Text>
			</View>
			<View style={{}}>
				<Image
					style={{
						borderWidth: 3,
						borderColor: colors.brand,
						borderRadius: 300,
					}}
					source={{ uri: image }}
					width={45}
					height={45}
				></Image>
			</View>
		</View>
	);
};
