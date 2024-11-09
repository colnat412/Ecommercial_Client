import { style } from "@/src/constants";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { DismissKeyboardView } from "../components";
import { Search as SearchIcon } from "../../assets/";

export const Search = () => {
  return (
    <DismissKeyboardView>
      <View style={[style.container]}>
        <TextInput
          left={
            <View style={{ backgroundColor: "red", flex: 1 }}>
              <SearchIcon width={20} color={"black"} />
            </View>
          }
          placeholder="Search"
          mode="outlined"
        />
      </View>
    </DismissKeyboardView>
  );
};
