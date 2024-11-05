import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, RouteProp } from "@react-navigation/native";

export type RootTabParamList = {
        HomePage: undefined,
            as: undefined
}

export const Tab = createBottomTabNavigator<RootTabParamList>();


declare global {
     namespace ReactNavigation {
          interface RootParamList
               extends RootTabParamList {}
     }
}

export type ScreenTabNavigationProp =
     NavigationProp<RootTabParamList>;
export type ScreenTabRouteProp =
     RouteProp<RootTabParamList>;