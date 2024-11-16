import { DefaultTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { colors } from './color';

export const theme: ThemeProp = {
	colors: {
		text: colors.mainText,
		onPrimaryContainer: colors.mainText,
		primary: colors.brand, //backgroundColor
		onPrimary: colors.mainText, //textColor
		outline: colors.outline, //borderColor
		background: colors.mainBackground, //backgroundColor
	},
};
