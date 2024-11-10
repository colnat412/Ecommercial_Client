import { Brand } from "@/src/assets";
import { useEffect, useRef } from "react";
import { Animated, Button, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
    size?: number;
}

export const Loading = ({size}: Props) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	};

    useEffect(() => {
        fadeIn();
    }, [])

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Animated.View
				style={{
					opacity: fadeAnim,
				}}
			>
				<Brand width={size} height={size}></Brand>
			</Animated.View>
		</View>
	);
};
