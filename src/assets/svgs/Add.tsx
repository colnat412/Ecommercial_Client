import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Add = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg fill="none" viewBox="0 0 60 60" width={width} height={height}>
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="5"
			d="M30 47.5v-35M12.5 30h35"
		/>
	</Svg>
);
