import { style } from "@/src/constants";
import { Product } from "@/types";
import { useState } from "react";
import { FlatList, Image, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

interface FavoriteListProps {
    products: Product[];
}

export const FavoriteList = ({ products }: FavoriteListProps) => {
    const [favoriteData, setFavoriteData] = useState<Product[]>(products);

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={products}
            renderItem={({ item }) => (
                <ProductCard product={item} />
            )}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >

        </FlatList>
    );
}


const ProductCard = ({ product }: { product: Product }) => {
    return (
        <View style={[style.rowCenter, {}]}>
            <Image source={{ uri: product.images_url }} style={{ width: 100, height: 100 }} />
            <View style={{flex: 1}}>
                <Text style={[style.headerText]}>{product.name}</Text>
                <Text numberOfLines={1} style={[style.titleText]}>{product.description}</Text>
                <Text>{product.price}</Text>
            </View>
        </View>
    )
}