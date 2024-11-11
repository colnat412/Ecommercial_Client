import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Cart = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg fill="none" viewBox="0 0 100 100" width={width} height={height}>
		<Path
			d="M26.249 20.8333H87.5L79.1667 50H30.7363M83.3333 66.6667H33.3333L25 12.5H12.5M37.5 83.3333C37.5 85.6346 35.6345 87.5 33.3333 87.5C31.0322 87.5 29.1667 85.6346 29.1667 83.3333C29.1667 81.0321 31.0322 79.1667 33.3333 79.1667C35.6345 79.1667 37.5 81.0321 37.5 83.3333ZM83.3333 83.3333C83.3333 85.6346 81.4679 87.5 79.1667 87.5C76.8654 87.5 75 85.6346 75 83.3333C75 81.0321 76.8654 79.1667 79.1667 79.1667C81.4679 79.1667 83.3333 81.0321 83.3333 83.3333Z"
			stroke={color}
			strokeWidth={5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
