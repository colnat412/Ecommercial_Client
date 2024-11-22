import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path, G, Defs, ClipPath } from 'react-native-svg';

export const EmptyBox = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg fill="none" viewBox="0 0 61 61" width={width} height={height}>
		<G clipPath="url(#clip0_639_908)">
			<Path
				fill={color}
				d="m59.911 21.339-.007-.011-6.517-8.114a1.6 1.6 0 0 0-.244-.24 1.52 1.52 0 0 0-1.165-.548H8.936c-.47 0-.883.216-1.164.548q-.133.104-.245.24l-6.516 8.114-.007.011c-.332.28-.547.694-.547 1.162v25.072c0 .844.685 1.529 1.529 1.529h56.943c.844 0 1.528-.685 1.528-1.529V22.501c0-.468-.215-.881-.546-1.162m-6.404-3.094 2.191 2.728h-2.19zm-3.057-2.762v5.49H39.005a1.53 1.53 0 0 0-.906.297l-7.64 5.623-7.643-5.623a1.53 1.53 0 0 0-.906-.297H10.464v-5.49zm-43.042 5.49H5.217l2.19-2.728zM57.4 46.045H3.514V24.03h17.894l8.144 5.992a1.53 1.53 0 0 0 1.812 0l8.142-5.993h17.895z"
			></Path>
		</G>
		<Defs>
			<ClipPath id="clip0_639_908">
				<Path fill="#fff" d="M.457.764h60v60h-60z"></Path>
			</ClipPath>
		</Defs>
	</Svg>
);
