import { Category } from "@/src/types/category";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

const CategoryItem = ({ id, name, image }: Category) => {
  return (
    <Pressable style={styles.container}>
      <Image style={styles.circularImage} source={{ uri: image }} />
      <Text numberOfLines={1} style={styles.textStyle}>
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 16,
    padding: 10,
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: "hidden",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: 100,
  },
});

export default CategoryItem;
