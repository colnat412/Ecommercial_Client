import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { Search } from "../Search";
import data from "@/dbTest.json";

import { colors, style } from "@/src/constants";
import ProductItem from "../product/Product";
import ProductSelling from "../product/ProductSelling";
import ProductRecommended from "../product/ProductRecommended";
import Products from "../product/Products";
import { HeaderTitleWithBack } from "../../navigation/components";

export const SubCategory = () => {
  return (
    <View style={styles.container}>
      <HeaderTitleWithBack title="Category" />
      <ScrollView>
        <ProductSelling />
        <ProductRecommended />
        <Products />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
});