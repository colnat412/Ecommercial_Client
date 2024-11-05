import { style } from "@/src/constants/style";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { GoBack as Back } from "@/src/assets"
import { colors } from "@/src/constants/color";
export const GoBack = () => {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.navigate("HomePage");
    }

    return (
        <TouchableOpacity onPress={goBack} style={[style.headerContainer, { gap: 8, position: "absolute", top: 32, left: 0 }]}>
            <Back width={12} height={12} color={colors.mainText} />
            <Text>Go Back</Text>
        </TouchableOpacity>
    );
}