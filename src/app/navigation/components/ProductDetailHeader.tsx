import { Brand, Cart, GoBack, User } from "@/src/assets";
import { colors, style } from "@/src/constants";
import { StackScreenNavigationProp } from "@/src/libs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface ProductDetailHeaderProps {
  title: string;
}

export const ProductDetailHeader = ({ title }: ProductDetailHeaderProps) => {
  const navigation = useNavigation<StackScreenNavigationProp>();

  const goLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View
      style={[
        style.headerContainer,
        { backgroundColor: "white", paddingTop: 0 },
      ]}
    >
      <View style={[style.rowCenter]}>
        <GoBack width={12} height={12} color={colors.mainText} />
        <Text style={{ fontSize: 16 }}>{title}</Text>
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
