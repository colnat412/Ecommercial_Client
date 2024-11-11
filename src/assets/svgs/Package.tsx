import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Package = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg width={width} height={height} fill="none" viewBox="0 0 25 25">
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeWidth="2"
			d="M22.9 10.416c-.038-1.365-.168-2.236-.606-2.98-.622-1.056-1.742-1.644-3.984-2.82l-2.083-1.093c-1.829-.96-2.743-1.44-3.727-1.44s-1.898.48-3.727 1.44L6.69 4.616C4.449 5.792 3.328 6.38 2.706 7.436c-.623 1.058-.623 2.373-.623 5.003v.122c0 2.63 0 3.945.623 5.002.622 1.056 1.743 1.644 3.984 2.82l2.083 1.094c1.829.96 2.743 1.44 3.727 1.44s1.898-.48 3.727-1.44l2.083-1.093c2.242-1.177 3.362-1.765 3.984-2.822.438-.743.568-1.613.606-2.979M21.875 7.813l-4.167 2.083m0 0-.52.26L12.5 12.5m5.208-2.604v3.646m0-3.646L7.813 4.687M12.5 12.5 3.125 7.813M12.5 12.5v9.896"
		></Path>
	</Svg>
);
