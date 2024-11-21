import { colors } from '@/src/constants';
import { View } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const Line = () => {
	return (
		<View
			style={{
				opacity: 0.5,
				width: '100%',
				height: 0.5,
				backgroundColor: 'black',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		/>
	);
};
