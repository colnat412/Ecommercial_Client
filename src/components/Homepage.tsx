
import { Text, View } from "react-native";
import { Brand, fonts } from "../assets";
import { useFonts } from 'expo-font';

export const HomePage = () => {
    const [fontsLoaded] = useFonts(fonts)
    
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: "red", fontFamily: "RubikWetPaint" }}>abcasdasdsadsad</Text>
            <Brand width={100} height={100} />
        </View>
    );
}
