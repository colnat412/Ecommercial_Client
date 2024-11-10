import { Brand, Cart, User } from "@/src/assets";
import { colors, style } from "@/src/constants";
import { StackScreenNavigationProp } from "@/src/libs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export const HomePageHeader = () => {
  const navigation = useNavigation<StackScreenNavigationProp>();

  const goLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[style.headerContainer, { backgroundColor: "white" }]}>
      <View style={[style.rowCenter]}>
        <Brand width={40} height={40} />
        <Text
          style={{
            fontSize: 24,
            color: colors.brand,
            fontFamily: "FiraMonoBold",
          }}
        >
          FOTAINE
        </Text>
      </View>
      <View style={[style.rowCenter, { gap: 16 }]}>
        <Cart width={20} height={20} color={colors.cart} />
        <TouchableOpacity onPress={goLogin}>
          <User width={25} height={25} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
