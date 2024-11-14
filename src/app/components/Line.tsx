import { colors } from '@/src/constants';
import { View } from 'react-native';

export const Line = () => {
	return (
		<View
			style={{
				opacity: 0.5,
				borderWidth: 0.5,
				width: '100%',
				height: 0.5,
				backgroundColor: colors.outline,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		/>
	);
};
