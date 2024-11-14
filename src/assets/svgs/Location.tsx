import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
export const Location = ({
	color = '#000000',
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg viewBox="0 0 40 40" fill="none" width={width} height={height}>
		<Path
			d="M20 22.3834C22.8719 22.3834 25.2 20.0553 25.2 17.1834C25.2 14.3115 22.8719 11.9834 20 11.9834C17.1281 11.9834 14.8 14.3115 14.8 17.1834C14.8 20.0553 17.1281 22.3834 20 22.3834Z"
			stroke={color}
			strokeWidth={1.5}
		/>
		<Path
			d="M6.03333 14.1497C9.31667 -0.283655 30.7 -0.266988 33.9667 14.1663C35.8833 22.633 30.6167 29.7997 26 34.233C22.65 37.4663 17.35 37.4663 13.9833 34.233C9.38333 29.7997 4.11666 22.6163 6.03333 14.1497Z"
			stroke={color}
			strokeWidth={1.5}
		/>
	</Svg>
);
