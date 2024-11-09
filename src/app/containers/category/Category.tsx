
import data from "@/dbTest.json";
import { FlatList, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";


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
