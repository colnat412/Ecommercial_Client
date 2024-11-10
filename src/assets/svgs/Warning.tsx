import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const Warning = (props: SvgProps) => (
	<Svg viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
			stroke="#af1a1a"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M12 8V13"
			stroke="#af1a1a"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M11.9946 16H12.0036"
			stroke="#af1a1a"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
export default Warning;
