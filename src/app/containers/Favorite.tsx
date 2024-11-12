import { colors, style } from '@/src/constants';
import { DismissKeyboardView, FavoriteList, ProductList } from '../components';
import { Button, Dialog, Paragraph, Portal, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { HeaderTitle } from '../navigation/components';
import { useEffect, useState } from 'react';
import { Product } from '@/src/types';
import axios from 'axios';
import { BE_URL } from '@/env';
import { useNavigation } from '@react-navigation/native';
import { StackScreenNavigationProp } from '@/src/libs';

export const Favorite = () => {
	const [favoriteData, setFavoriteData] = useState<Product[]>([]);
	const [visible, setVisible] = useState(false);
	const navigate = useNavigation<StackScreenNavigationProp>();

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const handleDelete = () => {
		// DO SOMETHING
		hideModal();
	};

	useEffect(() => {
		const fetchFavorite = async () => {
			try {
				const response = await axios.get(`${BE_URL}/products`);
				setFavoriteData(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchFavorite();
	}, []);

	const handlePressCard = () => {
		navigate.navigate('ProductDetail');
	};

	return (
		<View style={{ flex: 1 }}>
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

			<HeaderTitle title="Favorite" />
			<View style={[style.body]}>
				<ProductList
					products={favoriteData}
					onPressCard={handlePressCard}
					haveRight={true}
					onPressButtonRight={showModal}
				/>
			</View>
		</View>
	);
};
