import { colors, style } from '@/src/constants';
import { Pressable, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Filter, Search as SearchIcon } from '../../../assets';
import { DismissKeyboardView } from '../../components';

interface SearchInputProps {
	handleShowFilter?: () => void;
}

export const SearchInput = ({ handleShowFilter }: SearchInputProps) => {
	return (
		<DismissKeyboardView>
			<View
				style={[
					{
						backgroundColor: colors.mainBackground,
						marginTop: 32,
						paddingHorizontal: 16,
						flexDirection: 'row',
						justifyContent: 'space-between',
					},
				]}
			>
				<TextInput
					style={{ height: 40, width: '90%' }}
					left={<TextInput.Icon icon={SearchIcon} />}
					placeholder="Search"
					mode="outlined"
					activeOutlineColor={colors.brand}
				/>
				<Pressable
					onPress={handleShowFilter}
					style={{ justifyContent: 'center', alignItems: 'center' }}
				>
					<Filter />
				</Pressable>
			</View>
		</DismissKeyboardView>
	);
};
