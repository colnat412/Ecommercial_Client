import { Edit, Remove } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { Product } from '@/src/types';
import { formatCurrency } from '@/src/utils';
import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
	product: Product;
	onPressCard: () => void;
	haveRight: boolean;
	typeRight: 'edit' | 'remove';
	onPressButtonRight?: {
		remove?: (id: string) => void;
	};
	descrtipion: string;
	price: number;
}

export const ProductCard = React.memo(
	({
		product,
		onPressCard,
		haveRight,
		typeRight,
		onPressButtonRight,
		descrtipion,
		price,
	}: ProductCardProps) => {
		return (
			<Pressable
				onPress={onPressCard}
				style={[
					style.rowCenter,
					{
						marginHorizontal: 16,
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
					source={{ uri: product.images_url }}
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
							{descrtipion ? descrtipion : product.description}
						</Text>
					</View>
					<Text style={[style.priceText]}>
						{'$ '} {price ? price : product.price}
					</Text>
				</View>
				{haveRight === true ? (
					typeRight === 'remove' ? (
						<TouchableOpacity
							onPress={() =>
								onPressButtonRight?.remove
									? onPressButtonRight.remove(product.id)
									: () => {}
							}
							style={{
								backgroundColor: colors.textBrand,
								borderRadius: 8,
								padding: 8,
							}}
						>
							<Remove />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() =>
								onPressButtonRight?.remove
									? onPressButtonRight.remove(product.id)
									: () => {}
							}
							style={{
								backgroundColor: colors.textBrand,
								borderRadius: 8,
								padding: 8,
							}}
						>
							<Edit color={colors.secondText} />
						</TouchableOpacity>
					)
				) : (
					<></>
				)}
			</Pressable>
		);
	},
);
