import { colors, style } from '@/src/constants';
import {
	DismissKeyboardView,
	FavoriteList,
	NoData,
	ProductList,
} from '../../components';
import {
	Button,
	Dialog,
	Paragraph,
	Portal,
	Text,
	TextInput,
} from 'react-native-paper';
import { ActivityIndicator, View } from 'react-native';
import { HeaderTitle } from '../../navigation/components';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	StackScreenNavigationProp,
	useAppDispatch,
	useAppSelector,
} from '@/src/libs';
import { removeFavorite, setFavorite } from '@/src/libs/redux/store';
import { fetchFavorite } from '../../localHandle';
import { favoriteDelete } from './handle';

export const Favorite = () => {
	const favoriteData = useAppSelector((state) => state.favorite);
	const [deleteId, setDeleteId] = useState<string>('');
	const [deleteing, setDeleteing] = useState(false);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigation<StackScreenNavigationProp>();

	const dispatch = useAppDispatch();

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
		navigate.navigate('ProductDetail', { productId: productId });
	};

	useEffect(() => {
		const fetchFavoriteData = async () => {
			const response = await fetchFavorite();
			if (response.status === 200) {
				dispatch(setFavorite(response.data ? response.data : []));
				setLoading(false);
			}
		};
		fetchFavoriteData();
	}, []);

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
					<Dialog.Actions style={{gap: 10}}>
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
						{favoriteData.favorite ? (
							<ProductList
								products={favoriteData.favorite}
								onPressCard={handlePressCard}
								haveRight={true}
								onPressButtonRight={{ remove: showModal }}
							/>
						) : (
							<NoData />
						)}
					</>
				)}
			</View>
		</View>
	);
};
