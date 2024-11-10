import { ScrollView, View } from "react-native";

import Category from "./category/Category";
import Banner from "./Banner";
import { Search } from "./Search";
import { Recommended } from "./recommended";
import { HomePageHeader } from "../navigation/components";

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
