import { Stack } from "@/src/libs";
import { NavigationContainer } from "@react-navigation/native";
import { TabScreenApp } from "./TabScreenApp";
import { Login, ProductDetail, Register } from "../containers";
import SubCategory from "../containers/category/SubCategory";
import PaymentOption from "../containers/payment/PaymentOption";

export const StackScreenApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductDetail"
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      >
        <Stack.Screen name="TabScreenApp" component={TabScreenApp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="SubCategory" component={SubCategory} />
        <Stack.Screen name="PaymentOption" component={PaymentOption} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
