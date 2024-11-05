import Svg, { Path, SvgProps } from "react-native-svg";

export const Home = ({ color = "#05CFEA", width = 25, height = 25 }: SvgProps) => {
    return (
        <Svg
            fill="none"
            viewBox="0 0 100 100"
            width={width}
            height={height}
        >
            <Path
                d="M37.4999 83.3334H29.1666C24.5642 83.3334 20.8333 79.6026 20.8333 75.0001V45.4997C20.8333 43.0668 21.8963 40.7556 23.7433 39.1724L44.5766 21.3153C47.6974 18.6404 52.3024 18.6404 55.4233 21.3153L76.2566 39.1724C78.1037 40.7556 79.1666 43.0668 79.1666 45.4997V75.0001C79.1666 79.6026 75.4357 83.3334 70.8333 83.3334H62.4999M37.4999 83.3334V58.3334C37.4999 56.0322 39.3654 54.1668 41.6666 54.1668H58.3333C60.6345 54.1668 62.4999 56.0322 62.4999 58.3334V83.3334M37.4999 83.3334H62.4999"
                stroke={color}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

