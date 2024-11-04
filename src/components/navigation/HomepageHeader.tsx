import { Brand, Cart, User } from "@/src/assets";
import { style } from "@/src/constants/style";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "@/src/constants/color";

export const HomepageHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={[style.headerContainer, { backgroundColor: "white" }]}>
            <View style={[style.rowCenter]}>
                <Brand width={40} height={40} />
                <Text style={{ fontSize: 24, color: colors.brand, fontFamily: "FiraMonoBold" }}>FOTAINE</Text>
            </View>
            <View style={[style.rowCenter, { gap: 16 }]}>
                <Cart width={20} height={20} color={colors.cart} />
                <User width={25} height={25} color={"black"} />
            </View>
        </View>
    );
}