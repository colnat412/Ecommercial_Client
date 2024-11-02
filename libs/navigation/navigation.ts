import { RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Stack =
     createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
        HomePage: undefined;
};

declare global {
     namespace ReactNavigation {
          interface RootParamList
               extends RootStackParamList {}
     }
}

export type HomeScreenNavigationProp =
     NativeStackNavigationProp<
          RootStackParamList
     >;
export type HomeScreenRouteProp = RouteProp<
     RootStackParamList
>;

