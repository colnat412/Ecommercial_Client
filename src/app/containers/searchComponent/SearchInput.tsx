import { colors, style } from '@/src/constants';
import { Pressable, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Filter, Search as SearchIcon } from '../../../assets';
import { DismissKeyboardView } from '../../components';
import { useState } from 'react';
import { Product } from '@/src/types';
import { searchProduct } from './handle';
import { useRoute } from '@react-navigation/native';
import { StackScreenRouteProp } from '@/src/libs';

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
