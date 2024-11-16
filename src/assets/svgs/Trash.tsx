import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
export const Trash = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg viewBox="0 0 20 21" fill="none" width={width} height={height}>
		<Path
			d="M17.5 5.05827C14.725 4.78327 11.9333 4.6416 9.15 4.6416C7.5 4.6416 5.85 4.72494 4.2 4.8916L2.5 5.05827"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M7.08334 4.21719L7.26668 3.12552C7.40001 2.33385 7.50001 1.74219 8.90834 1.74219H11.0917C12.5 1.74219 12.6083 2.36719 12.7333 3.13385L12.9167 4.21719"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M15.7083 7.69141L15.1667 16.0831C15.075 17.3914 15 18.4081 12.675 18.4081H7.32499C4.99999 18.4081 4.92499 17.3914 4.83332 16.0831L4.29166 7.69141"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M8.60834 13.8252H11.3833"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M7.91666 10.4922H12.0833"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
