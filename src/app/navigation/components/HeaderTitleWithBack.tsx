import { Brand, Cart, GoBack, User } from '@/src/assets';
import { colors, style } from '@/src/constants';
import {
	StackScreenAccountNavigationProp,
	StackScreenNavigationProp,
} from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

interface HeaderTitleWithBackProps {
	title: string;
	showCart?: boolean;
	showUser?: boolean;
	navigation: StackScreenNavigationProp | StackScreenAccountNavigationProp;
}

export const HeaderTitleWithBack = ({
	title,
	navigation,
	showCart = true,
	showUser = true,
}: HeaderTitleWithBackProps) => {
	const goLogin = () => {
		// Check navigation type is StackScreenNavigationProp
		if ((navigation as StackScreenNavigationProp).navigate) {
			(navigation as StackScreenNavigationProp).navigate('Login');
		} else {
		}
	};

	return (
		<View
			style={[
				style.headerContainer,
				{ backgroundColor: 'white', paddingTop: 0 },
			]}
		>
			<View style={[style.rowCenter]}>
				<GoBack width={12} height={12} color={colors.mainText} />
				<Text style={{ fontSize: 16 }}>{title}</Text>
			</View>
			<View style={[style.rowCenter, { gap: 16 }]}>
				<TouchableOpacity >
					<Cart width={25} height={25} color={'black'} />
				</TouchableOpacity>
				<TouchableOpacity onPress={goLogin}>
					<User width={25} height={25} color={'black'} />
				</TouchableOpacity>
			</View>
		</View>
	);
};
