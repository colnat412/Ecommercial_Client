import { Tab } from "@/src/libs";
import { HomePage } from "../containers/HomePage";
import { colors } from "@/src/constants";
import { Home, Search as SearchIcon, Favorite as FavoriteIcon } from "@/src/assets";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Favorite, Search } from "../containers";

export const TabScreenApp = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: { fontSize: 10, fontWeight: "700" },
            tabBarLabel(props) {
                return (
                    <Text style={{ color: props.focused ? colors.brand : colors.disable, fontSize: 10, fontWeight: "700" }}>
                        {props.children}
                    </Text>
                )
            },
            tabBarButton(props) {
                return (
                    <TouchableOpacity {...props} />
                )
            },
            tabBarStyle: { height: 40, justifyContent: "center", alignItems: "center" },

        }}
            initialRouteName="Favorite"
        >
            <Tab.Screen name="HomePage" component={HomePage}
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (<Home color={focused ? colors.brand : colors.disable} />)
                }}
            />
            <Tab.Screen name="Search" component={Search}
                options={{
                    title: "Search",
                    tabBarIcon: ({ focused }) => (<SearchIcon color={focused ? colors.brand : colors.disable} />)
                }}
            />
            <Tab.Screen name="Favorite" component={Favorite}
                options={{
                    title: "Favorite",
                    tabBarIcon: ({ focused }) => (<FavoriteIcon color={focused ? colors.brand : colors.disable} />)
                }}
            />
        </Tab.Navigator>
    );
}

