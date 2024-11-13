import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
export const Protect = (props: SvgProps) => (
	<Svg viewBox="0 0 40 40" fill="none" {...props}>
		<Path
			d="M34.85 18.5332C34.85 26.6832 28.9334 34.3165 20.85 36.5498C20.3 36.6998 19.7 36.6998 19.15 36.5498C11.0667 34.3165 5.14999 26.6832 5.14999 18.5332V11.2165C5.14999 9.84981 6.18335 8.29982 7.46669 7.78315L16.75 3.9832C18.8333 3.1332 21.1833 3.1332 23.2667 3.9832L32.55 7.78315C33.8167 8.29982 34.8667 9.84981 34.8667 11.2165L34.85 18.5332Z"
			stroke="#292D32"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M20 20.8337C21.841 20.8337 23.3333 19.3413 23.3333 17.5003C23.3333 15.6594 21.841 14.167 20 14.167C18.1591 14.167 16.6667 15.6594 16.6667 17.5003C16.6667 19.3413 18.1591 20.8337 20 20.8337Z"
			stroke="#292D32"
			strokeWidth={1.5}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M20 20.834V25.834"
			stroke="#292D32"
			strokeWidth={1.5}
			strokeMiterlimit={10}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
