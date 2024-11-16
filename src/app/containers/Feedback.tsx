import { BE_URL } from '@/env';
import { colors, style } from '@/src/constants';
import { StackScreenNavigationProp } from '@/src/libs';
import { Product } from '@/src/types';
import { useNavigation } from '@react-navigation/native';
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
	ProductList,
} from '../components';
import { HeaderTitleWithBack } from '../navigation/components';
import {
	Button,
	Dialog,
	Modal,
	Paragraph,
	Portal,
	Surface,
	Text,
	TextInput,
} from 'react-native-paper';
import { Cancel, Star } from '@/src/assets';

export const Feedback = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();

	const [productData, setProductData] = useState<Product[]>([]);
	const [visibleCart, setVisibleCart] = useState<boolean>(true);
	const [rating, setRating] = useState<number>(5);

	useEffect(() => {
		const fetchFeedback = async () => {
			try {
				const response = await axios.get(`${BE_URL}/products`);
				setProductData(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchFeedback();
	}, []);

	const handleRating = (value: number) => {
		setRating(value);
	};

	const handlePressCard = () => {
		setVisibleCart(!visibleCart);
	};

	const toggleModalCart = () => {
		setVisibleCart(!visibleCart);
	};

	return (
		<View style={[style.body, { marginTop: 32 }]}>
			<Portal>
				<Modal
					visible={visibleCart}
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
											multiline={true}
											mode="outlined"
											numberOfLines={6}
											placeholderTextColor={colors.secondText}
											style={{
												flex: 1,
												backgroundColor: colors.background,
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
										<ImageInput />
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
												{ justifyContent: 'space-between' },
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
									style={{ borderRadius: 8,marginTop: 16 }}
									buttonColor={colors.brand}
								>
									Submit
								</Button>
							</ScrollView>
						</Surface>
					</DismissKeyboardView>
				</Modal>
			</Portal>
			<HeaderTitleWithBack title="Feedback" />
			<ProductList products={productData} onPressCard={handlePressCard} />
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
