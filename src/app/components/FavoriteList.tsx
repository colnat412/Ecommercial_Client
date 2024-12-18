import { colors} from '@/src/constants';

import { Product } from '@/src/types';
import { useState } from 'react';
import {
	View,
} from 'react-native';
import {
	Button,
	Dialog,
	Paragraph,
	Portal,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackScreenNavigationProp } from '@/src/libs';

interface FavoriteListProps {
	products: Product[];
}

export const FavoriteList = ({ products }: FavoriteListProps) => {
	const [favoriteData, setFavoriteData] = useState<Product[]>(products);
	const navigation = useNavigation<StackScreenNavigationProp>();

	const [visible, setVisible] = useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const handlePress = (product: Product) => {
		navigation.navigate('ProductDetail', { productId: product.id });
	};

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

		</View>
	);
};
