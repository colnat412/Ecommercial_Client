import SvgComponent from "@/assets/svgs/Brand";
import { Text, View } from "react-native";

const HomePage = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: "red" }}>abcasdasdsadsad</Text>
            <SvgComponent width={100} height={100} />
        </View>
    );
}

export default HomePage;