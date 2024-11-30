import { BE_URL } from '@/env';
import { colors, style } from '@/src/constants';
import { Feedback as FeedbackType, Product } from '@/src/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	DismissKeyboardView,
	ImageInput,
	Line,
	NoData,
	ProductList,
} from '../../components';
import { HeaderTitleWithBack } from '../../navigation/components';
import {
	Button,
	Modal,
	Portal,
	Surface,
	Text,
	TextInput,
} from 'react-native-paper';
import { Cancel, Star } from '@/src/assets';
import { api, AppDispatch, useAppSelector } from '@/src/libs';
import { fetchAddFeedback } from './handle';
import * as DocumentPicker from 'expo-document-picker';
import { FileDetails } from '@/src/types/others';
import { useDispatch } from 'react-redux';
import { fetchFeedback } from '../../localHandle';
import { setFeedback } from '@/src/libs/redux/store';
export const Feedback = () => {
	const feedbackData: FeedbackType[] = useAppSelector(
		(state) => state.feedback?.feedback || [],
	);

	const [visibleFeedback, setVisibleFeedback] = useState<boolean>(false);
	const [rating, setRating] = useState<number>(5);
	const [comment, setComment] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [feedbackId, setFeedbackId] = useState<string>('');

	const [productData, setProductData] = useState<Product[]>([]);

	useEffect(() => {
		const products = feedbackData.map((item) => item.product);
		setProductData(products);
	}, [feedbackData]);

	const [file, setFile] = useState<FileDetails | null>(null);
	const dispatch = useDispatch<AppDispatch>();

	const pickDocument = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: 'image/*',
				copyToCacheDirectory: true,
			});

			console.log (result);
			if (result.canceled === false) {
				setFile({
					uri: result.assets[0].uri,
					name: result.assets[0].name,
					size: result.assets[0].size ?? 0,
					type: result.assets[0].mimeType ?? 'unknown',
				});
			}
		} catch (error) {
			console.error('Error picking document:', error);
		}
	};

	const uploadImage = async () => {
		try {
			if (file?.uri && file?.type && file?.name) {
				const formData = new FormData();
				formData.append('file', {
					uri: file.uri,
					name: file.name,
					type: file.type,
					size: file.size,
				} as unknown as Blob);
				const result = await api.post('/api/cloud/upload-file', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				return (
					result.data.data.url ??
					'https://i.pinimg.com/236x/7d/7e/b6/7d7eb65a1e0f84780188d62c7b7eef0d.jpg'
				);
			}
			return 'https://i.pinimg.com/236x/7d/7e/b6/7d7eb65a1e0f84780188d62c7b7eef0d.jpg';
		} catch (error) {
			console.log(error);
		}
	};

	const handleRating = (value: number) => {
		setRating(value);
	};

	const handlePressCard = (id: string) => {
		const feedbackIdPress = feedbackData.find(
			(item) => item.product.id === id,
		);
		setVisibleFeedback(true);
		setFeedbackId(feedbackIdPress?.id || '');
	};

	const handleSubmit = async () => {
		const imageResponse = await uploadImage();

		const response = await fetchAddFeedback(
			feedbackId,
			comment,
			rating,
			imageResponse,
		);

		if (response && response.statusCode === 200) {
			setVisibleFeedback(false);
			setRating(5);
			setComment('');
			setImage('');
			setFeedbackId('');
			setFile(null);

			const responseFeedback = await fetchFeedback();
			if (responseFeedback && responseFeedback.statusCode === 200) {
				dispatch(setFeedback(responseFeedback.data));
			}
		}
	};

	const toggleModalCart = () => {
		setVisibleFeedback(!visibleFeedback);
		setRating(5);
		setComment('');
		setImage('');
		setFeedbackId('');
		setFile(null);
	};

	return (
		<View
			style={[
				style.body,
				{ paddingTop: 32, backgroundColor: colors.background },
			]}
		>
			<Portal>
				<Modal
					visible={visibleFeedback}
					onDismiss={toggleModalCart}
					contentContainerStyle={[styles.surface, { padding: 0 }]}
					style={[styles.modalContainer]}
				>
					<DismissKeyboardView>
						<Surface style={[styles.content, { gap: 12 }]}>
							<View style={[style.rowCenterBetween]}>
								<Text style={style.headerText}>Feedback</Text>
								<TouchableOpacity onPress={toggleModalCart}>
									<Cancel color={colors.disable} />
								</TouchableOpacity>
							</View>
							<View style={{ flex: 1 }}>
								<Line />
							</View>
							<ScrollView
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
							>
								<View style={[{ flex: 1, gap: 16 }]}>
									<View style={{ flex: 1 }}>
										<Text
											style={[style.headerText, { fontSize: 16 }]}
										>
											Comment
										</Text>
										<TextInput
											value={comment}
											onChangeText={setComment}
											multiline={true}
											mode="outlined"
											numberOfLines={6}
											placeholderTextColor={colors.secondText}
											style={{
												flex: 1,
												backgroundColor: colors.background,
												paddingVertical: 8,
											}}
											activeOutlineColor={colors.brand}
										/>
									</View>

									<Line />

									<View style={{ flex: 1, gap: 16 }}>
										<Text
											style={[style.headerText, { fontSize: 16 }]}
										>
											Image
										</Text>
										<ImageInput onPress={pickDocument} value={file} />
									</View>

									<Line />

									<View style={{ flex: 1, gap: 16 }}>
										<Text
											style={[style.headerText, { fontSize: 16 }]}
										>
											Rating
										</Text>
										<View
											style={[
												style.rowCenter,
												{ justifyContent: 'center' },
											]}
										>
											<Pressable onPress={() => handleRating(1)}>
												<Star
													width={50}
													height={50}
													color={
														rating < 1
															? colors.secondText
															: '#F3C63F'
													}
												/>
											</Pressable>
											<Pressable onPress={() => handleRating(2)}>
												<Star
													width={50}
													height={50}
													color={
														rating < 2
															? colors.secondText
															: '#F3C63F'
													}
												/>
											</Pressable>
											<Pressable onPress={() => handleRating(3)}>
												<Star
													width={50}
													height={50}
													color={
														rating < 3
															? colors.secondText
															: '#F3C63F'
													}
												/>
											</Pressable>
											<Pressable onPress={() => handleRating(4)}>
												<Star
													width={50}
													height={50}
													color={
														rating < 4
															? colors.secondText
															: '#F3C63F'
													}
												/>
											</Pressable>
											<Pressable onPress={() => handleRating(5)}>
												<Star
													width={50}
													height={50}
													color={
														rating < 5
															? colors.secondText
															: '#F3C63F'
													}
												/>
											</Pressable>
										</View>
									</View>
								</View>
								<Button
									mode="contained"
									style={{ borderRadius: 8, marginTop: 16 }}
									buttonColor={colors.brand}
									onPress={handleSubmit}
								>
									Submit
								</Button>
							</ScrollView>
						</Surface>
					</DismissKeyboardView>
				</Modal>
			</Portal>
			<HeaderTitleWithBack title="Feedback" />

			{productData.length > 0 ? (
				<ProductList products={productData} onPressCard={handlePressCard} />
			) : (
				<NoData message={`You don't have any feedback`} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		justifyContent: 'flex-end',
	},
	surface: {
		padding: 10,
	},
	content: {
		backgroundColor: colors.mainBackground,
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
