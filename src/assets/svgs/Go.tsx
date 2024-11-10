import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export const Go = ({
  color = "#F3C63F",
  width = 25,
  height = 25,
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 60 60">
    <G clipPath="url(#clip0_90_183)">
      <Path
        fill="#ACB0B8"
        d="M45.358 28.804 17.054.5a1.69 1.69 0 0 0-2.401 0 1.69 1.69 0 0 0 0 2.401L41.75 29.998 14.653 57.095a1.69 1.69 0 0 0 0 2.402c.327.327.767.503 1.194.503.428 0 .868-.163 1.195-.503l28.304-28.304a1.69 1.69 0 0 0 .012-2.39"
      ></Path>
    </G>
    <Defs>
      <ClipPath id="clip0_90_183">
        <Path fill="#fff" d="M0 0h60v60H0z"></Path>
      </ClipPath>
    </Defs>
  </Svg>
);
