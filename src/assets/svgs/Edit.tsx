import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Edit = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg fill="none" viewBox="0 0 15 15" width={width} height={height}>
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit="10"
			strokeWidth="1.5"
			d="m8.287 2.25-5.13 5.431a1.9 1.9 0 0 0-.42.894l-.23 2.025c-.082.731.443 1.231 1.168 1.106l2.012-.343c.282-.05.675-.257.87-.47l5.13-5.43c.888-.938 1.288-2.007-.093-3.313-1.375-1.294-2.419-.837-3.307.1"
		></Path>
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit="10"
			strokeWidth="1.5"
			d="M7.431 3.155a3.83 3.83 0 0 0 3.407 3.219M1.875 13.749h11.25"
		></Path>
	</Svg>
);
