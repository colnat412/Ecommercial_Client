import { colors } from "@/src/constants"
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const Cancel = ({ color = colors.brand, width = 20, height = 20 }: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 61 61"
        width={width}
        height={height}
    >
        <Path
            fill={color}
            fillRule="evenodd"
            d="m49.275 14.275-3.55-3.55L30 26.475l-15.725-15.75-3.55 3.55L26.475 30l-15.75 15.725 3.55 3.55L30 33.525l15.725 15.75 3.55-3.55L33.525 30z"
            clipRule="evenodd" 
            />
    </Svg>
)
