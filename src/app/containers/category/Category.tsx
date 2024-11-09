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
      renderItem={({ item }) => (
        <CategoryItem id={item.id} name={item.name} image={item.image} />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
});

export default Category;
