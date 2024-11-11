import { Remove } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { formatCurrency } from '@/src/utils';
import { Product } from '@/src/types';
import { useRef, useState } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	ScrollView,
	Touchable,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	Button,
	Dialog,
	Modal,
	Paragraph,
	Portal,
	Text,
} from 'react-native-paper';

interface FavoriteListProps {
	products: Product[];
}

export const FavoriteList = ({ products }: FavoriteListProps) => {
	const [favoriteData, setFavoriteData] = useState<Product[]>(products);

	const [visible, setVisible] = useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const handlePress = () => {};

	const handleDelete = () => {
		hideModal();
	};

	return (
		<View>
			<Portal>
				<Dialog
					visible={visible}
					onDismiss={hideModal}
					style={{ backgroundColor: colors.mainBackground }}
				>
					<Dialog.Title>Xác nhận xóa</Dialog.Title>
					<Dialog.Content>
						<Paragraph>
							Bạn có chắc chắn muốn xóa mục này không?
						</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							onPress={handleDelete}
							buttonColor={colors.dangerous}
							textColor={colors.textBrand}
							contentStyle={{ paddingHorizontal: 8 }}
						>
							Xóa
						</Button>
						<Button
							onPress={hideModal}
							mode="text"
							textColor={colors.disable}
						>
							Hủy
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<FlatList
				keyExtractor={(item) => item.id}
				data={products}
				renderItem={({ item }) => (
					<ProductCard
						product={item}
						handlePress={handlePress}
						showModal={showModal}
					/>
				)}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			></FlatList>
		</View>
	);
};

interface ProductCardProps {
	product: Product;
	handlePress: () => void;
	showModal: () => void;
}

const ProductCard = ({ product, handlePress, showModal }: ProductCardProps) => {
	return (
		<Pressable
			onPress={handlePress}
			style={[
				style.rowCenter,
				{
					marginHorizontal: 16,
					marginVertical: 4,
					backgroundColor: colors.textBrand,
					paddingVertical: 8,
					paddingHorizontal: 8,
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
				style={{ width: 100, height: 100, borderRadius: 8, padding: 10 }}
			/>
			<View style={{ flex: 1, justifyContent: 'flex-start' }}>
				<Text style={[style.headerText]}>{product.name}</Text>
				<Text
					numberOfLines={3}
					style={[style.titleText, { maxWidth: '70%' }]}
				>
					{product.description}
				</Text>
				<Text style={[style.priceText]}>
					{formatCurrency(product.price)}
				</Text>
			</View>
			<TouchableOpacity onPress={showModal}>
				<Remove />
			</TouchableOpacity>
		</Pressable>
	);
};
