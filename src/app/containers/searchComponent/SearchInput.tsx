import { colors, style } from '@/src/constants';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Search as SearchIcon } from '../../../assets';
import { DismissKeyboardView } from '../../components';

export const SearchInput = () => {
	return (
		<DismissKeyboardView>
			<View style={[style.container]}>
				<TextInput
					style={{ height: 40 }}
					left={<TextInput.Icon icon={SearchIcon} />}
					placeholder="Search"
					mode="outlined"
					activeOutlineColor={colors.brand}
				/>
			</View>
		</DismissKeyboardView>
	);
};
