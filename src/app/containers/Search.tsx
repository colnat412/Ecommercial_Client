import { style } from "@/src/constants";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { DismissKeyboardView } from "../components";

export const Search = () => {
    return (
        <DismissKeyboardView>
            <View style={[style.container]}>
                <TextInput
                    placeholder="Search"
                    mode="outlined"
                />
            </View>
        </DismissKeyboardView>
    );
}

