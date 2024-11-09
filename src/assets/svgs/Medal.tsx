import { colors } from "@/src/constants";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const Medal = ({
  color = colors.brand,
  width = 25,
  height = 25,
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 60 60">
    <Path
      stroke={color}
      strokeWidth="3.46154"
      d="M30 40c9.665 0 17.5-7.835 17.5-17.5S39.665 5 30 5s-17.5 7.835-17.5 17.5S20.335 40 30 40Z"
    ></Path>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth="3.46154"
      d="m18.378 37.5-1.592 5.807c-1.571 5.73-2.357 8.595-1.309 10.163.368.55.86.991 1.432 1.282 1.632.83 4.151-.482 9.19-3.107 1.676-.873 2.514-1.31 3.404-1.405q.496-.052.994 0c.89.095 1.728.532 3.405 1.405 5.038 2.625 7.557 3.938 9.189 3.107a3.8 3.8 0 0 0 1.431-1.282c1.049-1.568.263-4.433-1.307-10.163L41.622 37.5"
    ></Path>
  </Svg>
);
