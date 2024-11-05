import { DefaultTheme } from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { colors } from "./color";

export const theme: ThemeProp = {
     ...DefaultTheme,
     colors: {
          primary: colors.brand, //backgroundColor
          onPrimary: colors.textBrand, //textColor
     },
};
