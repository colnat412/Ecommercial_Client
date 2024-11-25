import { colors } from '@/src/constants';
import { Pressable, View } from 'react-native';
import { TextInput } from 'react-native-paper';
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

			<View
				style={[
					{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						gap: 10,
						maxHeight: 40,
					},
				]}
			>
				<TextInput
					style={{ height: 40, flex: 1, backgroundColor: colors.background }}
					left={<TextInput.Icon icon={SearchIcon} />}
					placeholder="Search"
					mode="outlined"
					activeOutlineColor={colors.brand}
					onChangeText={handleSearch}
					outlineColor={colors.outline}
					
				/>
				<Pressable
					onPress={handleShowFilter}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: colors.background,
						borderWidth: 1,
						borderColor: colors.outline,
						borderRadius: 5,
						height: 40,
						width: 40,
					}}
				>
					<Filter />
				</Pressable>
			</View>
	);
};
