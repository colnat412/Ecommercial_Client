import { colors, style } from '@/src/constants';
import { ScreenTabNavigationProp, StackScreenNavigationProp } from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { GoBack as Back } from '@/src/assets';

export const GoBack = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const navigationTab = useNavigation<ScreenTabNavigationProp>();
	const goBack = () => {
		if (navigationTab.getState().index === 1) {
			navigationTab.navigate('HomePage');
		} else {
			navigation.goBack();
		}
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
