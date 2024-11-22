import { Brand } from "@/src/assets";
import { colors, style } from "@/src/constants";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
	message: string;
	type?: "large" | "small";
}

export const ErrorContainter = ({ message, type = "small" }: Props) => {
	return (
		<View
			style={[
				style.centerContainer,
				style.columnCenter,
				{ flex: 1, gap: 4, width: 'auto' },
			]}
		>
			{type === 'large' ? (
				<Brand
					width={255}
					height={255}
					outline={colors.dangerous}
					color={colors.dangerous}
				/>
			) : (
				<Brand
					width={40}
					height={40}
					outline={colors.dangerous}
					color={colors.dangerous}
				/>
			)}
			<Text style={[style.headerText, { color: colors.secondText }]}>
				{message}
			</Text>
		</View>
	);
};
