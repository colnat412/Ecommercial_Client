import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootTabParamList = {
        HomePage: undefined,
        Login : undefined,
}

export const Tab = createBottomTabNavigator<RootTabParamList>();


declare global {
     namespace ReactNavigation {
          interface RootParamList
               extends RootTabParamList {}
     }
}

export type HomeScreenNavigationProp =
     NativeStackNavigationProp<RootTabParamList>;
export type HomeScreenRouteProp =
     RouteProp<RootTabParamList>;