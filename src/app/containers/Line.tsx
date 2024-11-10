import { colors } from "@/src/constants";
import { View } from "react-native";

export const Line = () => {
  return (
    <View
      style={{
        marginLeft: "5%",
        opacity: 0.5,
        borderWidth: 0.5,
        width: "90%",
        height: 0.5,
        backgroundColor: colors.outline,
      }}
    />
  );
};
