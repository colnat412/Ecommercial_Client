import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Search = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
		<Path
			d="M11.7083 6.25C14.5848 6.25 16.9167 8.58185 16.9167 11.4583M17.6029 17.3489L22.125 21.875M20.0417 11.4583C20.0417 16.0607 16.3107 19.7917 11.7083 19.7917C7.10596 19.7917 3.375 16.0607 3.375 11.4583C3.375 6.85596 7.10596 3.125 11.7083 3.125C16.3107 3.125 20.0417 6.85596 20.0417 11.4583Z"
			stroke={color}
			stroke-width="8"
		/>
	</Svg>
);
