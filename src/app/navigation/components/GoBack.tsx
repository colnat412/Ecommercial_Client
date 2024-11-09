import { colors, style } from "@/src/constants";
import { StackScreenNavigationProp } from "@/src/libs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { GoBack as Back } from "@/src/assets";

export const GoBack = () => {
  const navigation = useNavigation<StackScreenNavigationProp>();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={goBack}
      style={[style.rowCenter, { width: "100%" }]}
    >
      <Back width={12} height={12} color={colors.mainText} />
      <Text>Go Back</Text>
    </TouchableOpacity>
  );
};
