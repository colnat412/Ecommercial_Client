import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Minus = ({ color = colors.brand, width = 25, height = 25 }: SvgProps) => (
	<Svg fill="none" viewBox="0 0 60 60" width={width} height={height}>
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="5"
			d="M15 30h30"
		/>
	</Svg>
);
