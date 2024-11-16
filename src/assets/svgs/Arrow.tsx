import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
export const Arrow = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
		<Path
			d="M14.43 5.93005L20.5 12.0001L14.43 18.0701"
			stroke={color}
			strokeWidth={1.5}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M3.5 12H20.33"
			stroke={color}
			strokeWidth={1.5}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
