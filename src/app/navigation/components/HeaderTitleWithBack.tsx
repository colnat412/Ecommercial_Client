import { Brand, Cart, GoBack, User } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { StackScreenNavigationProp } from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

interface HeaderTitleWithBackProps {
	title: string;
	showCart?: boolean;
	showUser?: boolean;
}

export const HeaderTitleWithBack = ({
	title,
	showCart = false,
	showUser = false,
}: HeaderTitleWithBackProps) => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const goLogin = () => {
		navigation.navigate('Login');
	};

	const goBack = () => {
		navigation.goBack();
	};

	return (
		<View
			style={[
				style.headerContainer,
				{ backgroundColor: 'white', paddingTop: 0 },
			]}
		>
			<View style={[style.rowCenter]}>
				<TouchableOpacity onPress={goBack} style={{padding: 8}}>
					<GoBack width={12} height={12} color={colors.mainText} />
				</TouchableOpacity>
				<Text style={{ fontSize: 16, fontWeight: "800" }}>{title}</Text>
			</View>
			<View style={[style.rowCenter, { gap: 16 }]}>
				{showCart && (
					<TouchableOpacity>
						<Cart width={25} height={25} color={'black'} />
					</TouchableOpacity>
				)}
				{showUser && (
					<TouchableOpacity onPress={goLogin}>
						<User width={25} height={25} color={'black'} />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};
