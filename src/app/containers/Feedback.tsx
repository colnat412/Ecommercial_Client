import { style } from '@/src/constants';
import { ScreenTabNavigationProp } from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { HeaderTitleWithBack } from '../navigation/components';

export const Feedback = () => {
	const navigation = useNavigation<ScreenTabNavigationProp>();
	return (
		<View style={[style.body, { marginTop: 32 }]}>
			<HeaderTitleWithBack title="Feedback" />
			<ScrollView
			
			 ></ScrollView>
		</View>
	);
};

const FeedbackItem = () => {
	return <View></View>;
};
