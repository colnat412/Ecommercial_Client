import { style } from "@/src/constants";
import { DismissKeyboardView, FavoriteList } from "../components";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import { HeaderTitle } from "../navigation/components";
import { useEffect, useState } from "react";
import { Product } from "@/src/types";
import axios from "axios";

export const Favorite = () => {
    const [favoriteData, setFavoriteData] = useState<Product[]>([]);

    useEffect(() => {
        const fetchFavorite = async () => {
            try {
                const response = await axios.get("http://192.168.100.126:4000/products");
                setFavoriteData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFavorite();
    }, []);

    return (

            <View style={{flex :1 }}>
                <HeaderTitle title="Favorite" />
                <View style={[style.body]}>
                    <FavoriteList products={favoriteData} />
                </View>
            </View>
    );
}
