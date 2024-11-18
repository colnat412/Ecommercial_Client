import { colors } from "@/src/constants";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Send = ({ width = 25, height = 25, color = colors.brand }: SvgProps) => (
	<Svg fill="none" viewBox="0 0 18 18" width={width} height={height}>
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M8.625 9H4.064m-.13.598-.753 2.251c-.413 1.233-.619 1.85-.47 2.23.128.329.404.579.745.674.392.11.985-.157 2.17-.69l7.601-3.421c1.158-.521 1.736-.781 1.915-1.143a1.13 1.13 0 0 0 0-.997c-.179-.362-.757-.622-1.915-1.143L5.614 3.933c-1.182-.532-1.773-.798-2.166-.69-.34.096-.616.345-.745.674-.149.379.055.994.464 2.224l.77 2.319c.07.211.104.317.118.425q.019.144 0 .289c-.014.108-.05.213-.12.424"
		></Path>
	</Svg>
);
