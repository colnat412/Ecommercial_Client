import { EmptyBox } from '@/src/assets';
import { style } from '@/src/constants';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
	message: string;
}

export const NoData = ({ message }: Props) => {
	return (
		<View
			style={[
				style.centerContainer,
				style.columnCenter,
				{ flex: 1, gap: 4, width: 'auto' },
			]}
		>
			<EmptyBox width={60} height={60} />
			<Text style={[style.headerText]}>{message}</Text>
		</View>
	);
};
