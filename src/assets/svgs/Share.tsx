import { colors } from "@/src/constants"
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const Share = ({ color = colors.brand, width = 25, height = 25 }: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 60 60"
        width={width}
        height={height}
    >
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M26.448 9.936c1.752.528 2.88 4.368 3.312 9.048C42.504 18.984 54 32.352 54 48.192c-5.28-14.4-16.8-18.312-24.336-18.312-.504 4.224-1.584 7.608-3.216 8.088C21.408 39.432 6 29.856 6 23.952S21.384 8.472 26.448 9.936"
        ></Path>

    </Svg>
)

