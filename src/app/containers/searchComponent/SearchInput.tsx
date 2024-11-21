import { colors } from '@/src/constants';
import { Pressable, View } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { Filter, Search as SearchIcon } from '../../../assets';
import { DismissKeyboardView } from '../../components';


interface SearchInputProps {
	handleShowFilter?: () => void;
	handleSearch?: (text: string) => void;
}

export const SearchInput = ({
	handleShowFilter,
	handleSearch,
}: SearchInputProps) => {
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
					onChangeText={handleSearch}
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
