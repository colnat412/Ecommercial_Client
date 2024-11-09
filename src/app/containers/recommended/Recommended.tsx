import { View } from "react-native";
import data from "@/dbTest.json";
import { RecommendedItem } from "./RecommendedItem";


export const Recommended = () => {
  return (
    <View
      style={{
        justifyContent: "flex-start",
      }}
    >
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