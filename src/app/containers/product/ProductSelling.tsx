import { FlatList, Pressable, StyleSheet, View } from "react-native";
import data from "@/dbTest.json";
import ProductItem from "./Product";
import { Text } from "react-native-paper";
import { colors, style } from "@/src/constants";

const ProductSelling = () => {
  return (
    <View>
      <View style={styles.sellingStyle}>
        <Text style={[style.headerText, { fontSize: 18, padding: 14 }]}>
          Top Selling
        </Text>
        <Pressable>
          <Text style={{ color: colors.brand, fontWeight: "bold" }}>
            See all
          </Text>
        </Pressable>
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
  sellingStyle: {
    flexDirection: "row",
    gap: 226,
    alignItems: "center",
  },
});

export default ProductSelling;
