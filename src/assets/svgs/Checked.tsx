import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const Checked = (props: SvgProps) => (
	<Svg viewBox="0 0 72 72" fill="none" {...props}>
		<Rect width={72} height={72} rx={36} fill="#0089EB" />
		<Path
			d="M15.84 37.4405L29.281 50.4005L56.16 24.4805"
			stroke="white"
			strokeWidth={3.6}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
export default Checked;
