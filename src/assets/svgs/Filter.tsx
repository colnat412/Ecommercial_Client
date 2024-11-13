import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Filter = ({
	color = 'black',
	width = 24,
	height = 24,
}: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
		<Path
			d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
			stroke={color}
			strokeWidth={1.5}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M16.0701 16.52C17.8374 16.52 19.2701 15.0873 19.2701 13.32C19.2701 11.5527 17.8374 10.12 16.0701 10.12C14.3028 10.12 12.8701 11.5527 12.8701 13.32C12.8701 15.0873 14.3028 16.52 16.0701 16.52Z"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M19.8701 17.12L18.8701 16.12"
			stroke={color}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
