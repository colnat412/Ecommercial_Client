import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import data from "@/dbTest.json";
import CategoryItem from "./CategoryItem";
import { Search } from "../../containers";

const Category = () => {
  return (
    <FlatList
      data={data.categories}
      renderItem={({ item }) => <CategoryItem category={item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Category;
