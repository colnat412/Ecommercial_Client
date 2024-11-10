import { colors, style } from '@/src/constants';
import {
	StackScreenAccountNavigationProp,
	StackScreenNavigationProp,
} from '@/src/libs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { GoBack as Back } from '@/src/assets';

interface GoBackProps {
	navigation: StackScreenNavigationProp | StackScreenAccountNavigationProp;
}

export const GoBack = ({ navigation }: GoBackProps) => {
	const goBack = () => {
		navigation.goBack();
	};

	return (
		<TouchableOpacity
			onPress={goBack}
			style={[style.rowCenter, { width: '100%' }]}
		>
			<Back width={12} height={12} color={colors.mainText} />
			<Text>Go Back</Text>
		</TouchableOpacity>
	);
};
