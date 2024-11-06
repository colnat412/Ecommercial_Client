import { style } from "@/src/constants";
import { DismissKeyboardView } from "../components";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import { HeaderTitle } from "../navigation/components";

export const Favorite = () => {
    return (
        <DismissKeyboardView>
            <View style={{flex :1 }}>
                <HeaderTitle title="Favorite" />
                <View style={[style.body]}>
                    <TextInput
                        label="Search"
                        placeholder="Search"
                        mode="outlined"
                        style={{ width: "100%" }}
                    />
                </View>
            </View>
        </DismissKeyboardView>
    );
}
