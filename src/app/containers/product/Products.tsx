import { FlatList, Pressable, StyleSheet, View } from "react-native";
import data from "@/dbTest.json";
import ProductItem from "./Product";
import { Text } from "react-native-paper";
import { colors, style } from "@/src/constants";

const Products = () => {
  return (
    <View>
      <View style={styles.recommendedStyle}>
        <Text style={[style.headerText, { fontSize: 18, padding: 14 }]}>
          All Products
        </Text>
      </View>
      <FlatList
        style={{}}
        data={data.products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedStyle: {
    flexDirection: "row",
    gap: 226,
    alignItems: "center",
  },
});

export default Products;
