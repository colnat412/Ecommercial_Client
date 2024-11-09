import { style } from "@/src/constants";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface HeaderTitleProps {
  title: string;
}

export const HeaderTitle = ({ title }: HeaderTitleProps) => {
  return (
    <View
      style={[
        style.headerContainer,
        style.rowCenter,
        { backgroundColor: "white" },
      ]}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          width: "100%",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};
