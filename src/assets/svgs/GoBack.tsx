import Svg, { SvgProps, Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import React from "react";

export const GoBack = ({ color = "#05CFEA", width = 25, height = 25 }: SvgProps) => {
    return (
        <Svg
            viewBox="0 0 12 12"
            width={width}
            height={height}
            fill="none"
        >
            <G clipPath="url(#clip0_257_823)">
                <Path
                    d="M2.92833 5.76078L8.58915 0.0999633C8.72244 -0.0333211 8.93619 -0.0333211 9.06948 0.0999633C9.20276 0.233248 9.20276 0.447006 9.06948 0.58029L3.65008 5.99969L9.06948 11.4191C9.20276 11.5524 9.20276 11.7661 9.06948 11.8994C9.00409 11.9648 8.91608 12 8.83057 12C8.74507 12 8.65705 11.9673 8.59167 11.8994L2.93085 6.23859C2.79756 6.10782 2.79757 5.89155 2.92833 5.76078Z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_257_823">
                    <Rect
                        width={12}
                        height={12}
                        fill="white"
                        transform="matrix(-1 0 0 1 12 0)"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
}
