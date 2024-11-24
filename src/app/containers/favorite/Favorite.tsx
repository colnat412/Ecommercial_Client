import { colors, style } from '@/src/constants';
import { NoData, ProductList } from '../../components';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { ActivityIndicator, View } from 'react-native';
import { HeaderTitle } from '../../navigation/components';
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
	StackScreenNavigationProp,
	useAppDispatch,
	useAppSelector,
} from '@/src/libs';
import { removeFavorite, setFavorite } from '@/src/libs/redux/store';
import { fetchFavorite } from '../../localHandle';
import { favoriteDelete } from './handle';
import { Remove } from '@/src/assets';
import { DetailInformation } from '@/src/types';

export const Favorite = () => {
	const [deleteId, setDeleteId] = useState<string>('');
	const [deleteing, setDeleteing] = useState(false);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation<StackScreenNavigationProp>();

	const favoriteData = useAppSelector((state) => state.favorite);
	const detailsInformation: DetailInformation | null = useAppSelector(
		(state) => state.detailInfomation.detailInfomation,
	);
	const dispatch = useAppDispatch();

	const isFocused = useIsFocused();

	useEffect(() => {
		if (detailsInformation === null) {
			navigation.navigate('Login');
		}
		setLoading(false);
		if (!isFocused){
			setLoading(true);
		}
	}, [isFocused]);

	const showModal = (id: string) => {
		setDeleteId(id);
		setVisible(true);
	};
	const hideModal = () => {
		setDeleteId('');
		setVisible(false);
	};

	const handleDelete = async () => {
		const result = await favoriteDelete(deleteId);
		if (result) {
			dispatch(removeFavorite(deleteId));
			hideModal();
		}
	};

	const handlePressCard = (productId: string) => {
		navigation.navigate('ProductDetail', { productId: productId });
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
					<Dialog.Actions style={{ gap: 10 }}>
						{deleteing && (
							<ActivityIndicator size={'large'} color={colors.brand} />
						)}
						<Button
							disabled={deleteing}
							onPress={handleDelete}
							buttonColor={colors.dangerous}
							textColor={colors.textBrand}
							contentStyle={{ paddingHorizontal: 8 }}
						>
							Delete
						</Button>
						<Button
							disabled={deleteing}
							onPress={hideModal}
							mode="text"
							textColor={colors.disable}
						>
							Cancel
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<HeaderTitle title="Favorite" />
			<View style={[style.body, { justifyContent: 'center' }]}>
				{loading ? (
					<ActivityIndicator size="large" color={colors.brand} />
				) : (
					<>
						{favoriteData.favorite && favoriteData.favorite.length > 0 ? (
							<ProductList
								style={{ paddingHorizontal: 8 }}
								products={favoriteData.favorite}
								onPressCard={handlePressCard}
								componentRight={<Remove />}
								onPressButtonRight={showModal}
							/>
						) : (
							<NoData message={`You don't have any favorite`} />
						)}
					</>
				)}
			</View>
		</View>
	);
};
