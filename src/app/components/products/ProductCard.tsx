import { colors, style } from '@/src/constants';
import { Product } from '@/src/types';
import React, { ReactNode } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';

export interface ProductCardProps {
	product: Product;
	onPressCard: (id: string) => void;
	componentRight?: ReactNode | null;
	onPressButtonRight?: (id: string) => void;
	description?: string;
	price?: number;
}

export const ProductCard = React.memo(
	({
		product,
		onPressCard,
		componentRight,
		onPressButtonRight = () => {},
		description,
		price,
	}: ProductCardProps) => {
		return (
			<Pressable
				onPress={() => onPressCard(product.id)}
				style={[
					style.rowCenter,
					{
						marginVertical: 4,
						backgroundColor: colors.textBrand,
						paddingVertical: 8,
						paddingHorizontal: 8,
						gap: 20,
						borderRadius: 8,
						borderWidth: 1,
						borderColor: colors.outline,
						shadowColor: '#000',
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,

						elevation: 3,
					},
				]}
			>
				<Image
					source={{ uri: product.image_url }}
					style={{
						width: 100,
						height: 100,
						borderRadius: 8,
						padding: 10,
					}}
				/>
				<View style={{ flex: 1, justifyContent: 'flex-start', gap: 8 }}>
					<View>
						<Text style={[style.headerText]}>{product.name}</Text>
						<Text numberOfLines={3} style={[style.titleText]}>
							{description ? description : product.description}
						</Text>
					</View>
					<Text style={[style.priceText]}>
						{'$ '} {price ? price : product.price}
					</Text>
				</View>
				{componentRight ? (
					<TouchableOpacity
						onPress={() => {
							onPressButtonRight(product.id);
						}}
					>
						{componentRight}
					</TouchableOpacity>
				) : (
					<></>
				)}
			</Pressable>
		);
	},
);
