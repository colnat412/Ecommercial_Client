import { FlatList, View } from "react-native";
import data from "@/dbTest.json";
import RecommendedItem from "./RecommendedItem";
import { Text } from "react-native-paper";
import { style } from "@/src/constants";

const Recommended = () => {
  return (
    <View
      style={{
        justifyContent: "flex-start",
      }}
    >
      <Text style={[style.headerText, { fontSize: 16, padding: 12 }]}>
        Recommended for you
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {data.products.map((value, index) => (
          <RecommendedItem key={index} product={value} />
        ))}
      </View>
    </View>
  );
};

export default Recommended;
