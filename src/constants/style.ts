import { StyleSheet } from "react-native";
import { colors } from "./color";

export const style = StyleSheet.create({
     headerContainer: {
          paddingTop: 32,
          paddingHorizontal: 8,
          paddingVertical: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
     },
     body: {
          flex: 1,
          paddingHorizontal: 16,
          backgroundColor: colors.mainBackground,
     },
     rowCenter: {
          flexDirection: "row",
          alignItems: "center",
          gap: 8
     },
     columnCenter: {
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          width: "100%"
     },
     centerContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     textInput:{
          backgroundColor: "white",
          padding: 8,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "gray",
          width: "100%",
     },
     button: {
          backgroundColor: colors.brand,
          borderRadius: 8,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
     },
     buttonText: {
          width: "100%",
     },
});
