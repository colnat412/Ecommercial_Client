import { ScrollView, View } from "react-native";
import { HomePageHeader } from "../navigation/components";
import Category from "./category/Category";
import Banner from "./Banner";
import Recommended from "./recommended/Recommended";
import { Search } from "./Search";

export const HomePage = () => {
  return (
    <View style={{ flex: 1 }}>
      <HomePageHeader />
      <ScrollView>
        <Search />
        <Category />
        <Banner />
        <Banner />
        <Recommended />
      </ScrollView>
    </View>
  );
};
