import { colors, style } from '@/src/constants';
import {
	Dimensions,
	Image,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	ActivityIndicator,
	Button,
	Modal,
	Portal,
	RadioButton,
	Surface,
	Text,
} from 'react-native-paper';

import {
	Add,
	Brand,
	Cancel,
	Cart,
	Favorite,
	Go,
	HalfStar,
	Medal,
	Minus,
	Share,
	Star,
	StarProduct,
	Truck,
} from '@/src/assets';
import { useEffect, useState } from 'react';
import { Feedback, Product, ProductDetail as IProductDetail} from '@/src/types';
import { getProduct, getReviews } from './handle';
import { HeaderTitleWithBack } from '../../navigation/components';
import { StackScreenApp } from '../../navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenNavigationProp, StackScreenRouteProp } from '@/src/libs';
import { Line } from '../../components/Line';

export const ProductDetail = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const route = useRoute<StackScreenRouteProp>();


	const [loading, setLoading] = useState<boolean>(true);
	const [product, setProduct] = useState<IProductDetail>();
	const [visibleCart, setVisibleCart] = useState<boolean>(false);
	const [feedback, setFeedback] = useState<Feedback[] | undefined>([]);

	useEffect(() => {
		const getContainer = async () => {
			const productResult = await getProduct(route.params?.productId ? route.params.productId : '');
			if (productResult) {
				setProduct(productResult.data ? productResult.data : undefined);
			}

			const feedbackResult = await getReviews(route.params?.productId ? route.params.productId : '');
			if (feedbackResult) {
				setFeedback(feedbackResult.data ? feedbackResult.data : []);
			}
			setLoading(false);
		}
		getContainer();
	}, []);

	const toggleModalCart = () => {
		setVisibleCart(!visibleCart);
	};

	const [visibleReviews, setRisibleReviews] = useState<boolean>(false);

	const toggleModalReviews = () => {
		setRisibleReviews(!visibleReviews);
	};

	return (
		<View style={{ marginTop: 32, flex: 1, justifyContent:"center", }}>
			{loading ? (
				<ActivityIndicator size={'large'} color={colors.brand} />
			) : (
				<>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
					>
						<HeaderTitleWithBack
							title={product?.name ? product?.name : ''}
						/>
						<View style={[style.body]}>
							<View style={[style.contentBody]}>
								<View
									style={[
										style.rowCenterCenter,
										style.outline,
										{
											paddingHorizontal: 8,
											paddingVertical: 8,
											width: '100%',
										},
									]}
								>
									<Image
										source={{
											uri: product?.images_url,
										}}
										width={336}
										height={216}
										alt="product"
									></Image>
								</View>
								<Text style={[style.headerText, { marginTop: 8 }]}>
									{product?.name ? product?.name : ''}
								</Text>
								<View
									style={[
										style.centerContainer,
										style.rowCenterBetween,
									]}
								>
									<Text style={[style.priceText, { marginTop: 8 }]}>
										{`$`} {product?.price ? product?.price : ''}
									</Text>
									<View style={[style.rowCenter]}>
										<View style={{ flexDirection: 'row' }}>
											<Star width={20} height={20} />
											<Text
												style={{ fontWeight: 'bold', fontSize: 16 }}
											>
												4.5
											</Text>
										</View>
										<Text
											style={{
												fontWeight: 'medium',
												fontSize: 16,
												color: colors.secondText,
											}}
										>
											(99 reviews)
										</Text>
									</View>
								</View>

								<View
									style={{
										width: '100%',
										height: 0.5,
										backgroundColor: colors.secondText,
										marginVertical: 15,
									}}
								/>

								<View>
									<Text
										style={[
											style.headerText,
											{ fontSize: 16, color: colors.mainText },
										]}
									>
										Description
									</Text>
									<Text
										style={[{ marginBottom: 8, paddingVertical: 16 }]}
									>
										{product?.description}
									</Text>
								</View>

								<View style={{ gap: 8 }}>
									<View style={[style.rowCenter]}>
										<View style={[style.rowCenter, { width: '50%' }]}>
											<Truck width={15} height={15} />
											<Text
												style={[
													style.headerText,
													{
														fontSize: 12,
														color: colors.secondText,
													},
												]}
											>
												Express
											</Text>
										</View>
										<View style={[style.rowCenter]}>
											<Share width={15} height={15} />
											<Text
												style={[
													style.headerText,
													{
														fontSize: 12,
														color: colors.secondText,
													},
												]}
											>
												30-day free return
											</Text>
										</View>
									</View>

									<View style={[style.rowCenter]}>
										<View style={[style.rowCenter, { width: '50%' }]}>
											<StarProduct width={15} height={15} />
											<Text
												style={[
													style.headerText,
													{
														fontSize: 12,
														color: colors.secondText,
													},
												]}
											>
												Good reviews
											</Text>
										</View>
										<View style={[style.rowCenter]}>
											<Medal width={15} height={15} />
											<Text
												style={[
													style.headerText,
													{
														fontSize: 12,
														color: colors.secondText,
													},
												]}
											>
												Authorized shop
											</Text>
										</View>
									</View>
								</View>

								<View
									style={{
										width: '100%',
										height: 0.5,
										backgroundColor: colors.secondText,
										marginVertical: 15,
									}}
								/>

								<View style={{ gap: 16 }}>
									<View style={[style.rowCenterBetween]}>
										<Text
											style={[
												style.headerText,
												{ fontSize: 16, color: colors.mainText },
											]}
										>
											Reviews
										</Text>
										<Pressable
											onPress={toggleModalReviews}
											style={[style.rowCenter]}
										>
											<Text
												style={{
													color: colors.secondText,
													fontWeight: 'medium',
												}}
											>
												See all
											</Text>
											<Go width={12} height={12} />
										</Pressable>
									</View>
									<View style={[style.rowCenterBetween, { gap: 16 }]}>
										<View style={{ gap: 8 }}>
											<View style={[style.rowCenter]}>
												<Text
													style={{
														fontWeight: 'bold',
														fontSize: 16,
													}}
												>
													4.5/5
												</Text>
											</View>
											<Text
												style={{
													fontWeight: 'medium',
													fontSize: 16,
													color: colors.secondText,
												}}
											>
												(99 reviews)
											</Text>
											<View style={[style.rowCenter, { gap: 0 }]}>
												<Star />
												<Star />
												<Star />
												<Star />
												<HalfStar />
											</View>
										</View>

										<View style={{ flex: 1 }}>
											<View style={[style.rowCenter]}>
												<View style={{ flex: 1, height: 6 }}>
													<View style={{ width: '100%' }}>
														<View
															style={{
																width: '100%',
																height: 6,
																backgroundColor:
																	colors.rateLine,
																borderRadius: 8,
															}}
														/>
														<View
															style={{
																position: 'relative',
																top: -6,
																borderRadius: 8,
																width: '80%',
																height: 6,
																backgroundColor:
																	colors.rateStar,
															}}
														/>
													</View>
												</View>
												<Text>5</Text>
											</View>
											<View style={[style.rowCenter]}>
												<View style={{ flex: 1, height: 6 }}>
													<View style={{ width: '100%' }}>
														<View
															style={{
																width: '100%',
																height: 6,
																backgroundColor:
																	colors.rateLine,
																borderRadius: 8,
															}}
														/>
														<View
															style={{
																position: 'relative',
																top: -6,
																borderRadius: 8,
																width: '44%',
																height: 6,
																backgroundColor:
																	colors.rateStar,
															}}
														/>
													</View>
												</View>
												<Text>4</Text>
											</View>
											<View style={[style.rowCenter]}>
												<View style={{ flex: 1, height: 6 }}>
													<View style={{ width: '100%' }}>
														<View
															style={{
																width: '100%',
																height: 6,
																backgroundColor:
																	colors.rateLine,
																borderRadius: 8,
															}}
														/>
														<View
															style={{
																position: 'relative',
																top: -6,
																borderRadius: 8,
																width: '33%',
																height: 6,
																backgroundColor:
																	colors.rateStar,
															}}
														/>
													</View>
												</View>
												<Text>3</Text>
											</View>
											<View style={[style.rowCenter]}>
												<View style={{ flex: 1, height: 6 }}>
													<View style={{ width: '100%' }}>
														<View
															style={{
																width: '100%',
																height: 6,
																backgroundColor:
																	colors.rateLine,
																borderRadius: 8,
															}}
														/>
														<View
															style={{
																position: 'relative',
																top: -6,
																borderRadius: 8,
																width: '22%',
																height: 6,
																backgroundColor:
																	colors.rateStar,
															}}
														/>
													</View>
												</View>
												<Text>2</Text>
											</View>
											<View style={[style.rowCenter]}>
												<View style={{ flex: 1, height: 6 }}>
													<View style={{ width: '100%' }}>
														<View
															style={{
																width: '100%',
																height: 6,
																backgroundColor:
																	colors.rateLine,
																borderRadius: 8,
															}}
														/>
														<View
															style={{
																position: 'relative',
																top: -6,
																borderRadius: 8,
																width: '12%',
																height: 6,
																backgroundColor:
																	colors.rateStar,
															}}
														/>
													</View>
												</View>
												<Text>1</Text>
											</View>
										</View>
									</View>
								</View>

								<View style={{ gap: 12, marginTop: 32 }}>
									{feedback ? (
										feedback.slice(0, 5).map((item, index) => (
											<View
												key={index}
												style={[
													style.rowCenterCenter,
													{ gap: 32, alignItems: 'flex-start' },
												]}
											>
												<Image
													source={{ uri: item.imageUrl }}
													width={40}
													height={40}
													alt="avatar"
													style={{ borderRadius: 300 }}
												/>
												<View style={{ flex: 1 }}>
													<View style={[style.rowCenterBetween]}>
														<Text
															style={{
																fontWeight: 'bold',
																fontSize: 16,
																color: colors.mainText,
															}}
														>
															{item.detailInfomation.fullName}
														</Text>
														<Text
															style={{
																fontSize: 12,
																color: colors.secondText,
															}}
														>
															1 day ago
														</Text>
													</View>
													<View style={[style.rowCenterBetween]}>
														<Text
															style={{
																fontSize: 12,
																color: colors.secondText,
															}}
														>
															{item.comment}
														</Text>
													</View>
												</View>
											</View>
										))
									) : (
										<></>
									)}
								</View>

								<View
									style={{
										width: '100%',
										height: 0.5,
										backgroundColor: colors.secondText,
										marginVertical: 15,
									}}
								/>
							</View>
						</View>
					</ScrollView>

					<View
						style={[
							style.rowCenter,
							{
								paddingVertical: Platform.OS === 'ios' ? 20 : 4,
								paddingHorizontal: 16,
							},
						]}
					>
						<Pressable
							onPress={toggleModalCart}
							style={[
								style.outline,
								{ padding: 8, borderColor: colors.brand },
							]}
						>
							<Cart width={20} height={20} />
						</Pressable>
						<Pressable
							style={[
								style.outline,
								{ padding: 8, borderColor: colors.brand },
							]}
						>
							<Favorite width={20} height={20} />
						</Pressable>
						<Button
							style={[
								style.outline,
								{ borderColor: colors.brand, flex: 1 },
							]}
							textColor={colors.textBrand}
							buttonColor={colors.brand}
						>
							Buy Now
						</Button>
					</View>

					<Portal>
						<Modal
							visible={visibleReviews}
							onDismiss={toggleModalReviews}
							style={{ paddingHorizontal: 12 }}
						>
							<View
								style={{
									backgroundColor: colors.mainBackground,
									height: 'auto',
									maxHeight: '90%',
									padding: 12,
									borderRadius: 4,
									gap: 12,
								}}
							>
								<View style={[style.rowCenterBetween]}>
									<Text style={style.headerText}>Reviews</Text>
									<TouchableOpacity onPress={toggleModalReviews}>
										<Cancel color={colors.disable} />
									</TouchableOpacity>
								</View>
								<ScrollView
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
								>
									<View style={{ gap: 12 }}>
										{feedback ? (
											feedback.slice(0, 5).map((item, index) => (
												<View
													key={index}
													style={[
														style.rowCenterCenter,
														{ gap: 32, alignItems: 'flex-start' },
													]}
												>
													<Image
														source={{ uri: item.imageUrl }}
														width={40}
														height={40}
														alt="avatar"
														style={{ borderRadius: 300 }}
													/>
													<View style={{ flex: 1 }}>
														<View
															style={[style.rowCenterBetween]}
														>
															<Text
																style={{
																	fontWeight: 'bold',
																	fontSize: 16,
																	color: colors.mainText,
																}}
															>
																{item.detailInfomation.fullName}
															</Text>
															<Text
																style={{
																	fontSize: 12,
																	color: colors.secondText,
																}}
															>
																1 day ago
															</Text>
														</View>
														<View
															style={[style.rowCenterBetween]}
														>
															<Text
																style={{
																	fontSize: 12,
																	color: colors.secondText,
																}}
															>
																{item.comment}
															</Text>
														</View>
													</View>
												</View>
											))
										) : (
											<></>
										)}
									</View>
								</ScrollView>
							</View>
						</Modal>
					</Portal>

					<Portal>
						<Modal
							visible={visibleCart}
							onDismiss={toggleModalCart}
							contentContainerStyle={[styles.surface, { padding: 0 }]}
							style={[styles.modalContainer]}
						>
							<Surface style={[styles.content, { gap: 12 }]}>
								<View style={[style.rowCenterBetween]}>
									<Text style={style.headerText}>Add to cart</Text>
									<TouchableOpacity onPress={toggleModalCart}>
										<Cancel color={colors.disable} />
									</TouchableOpacity>
								</View>
								<ScrollView
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
								>
									<View style={[style.rowCenterBetween, { flex: 1 }]}>
										<Text
											style={[style.headerText, { fontSize: 16 }]}
										>
											HeadPhone
										</Text>
										<View style={[style.rowCenter]}>
											<View style={{ flexDirection: 'row' }}>
												<Star width={20} height={20} />
												<Text
													style={{
														fontWeight: 'bold',
														fontSize: 16,
													}}
												>
													4.5
												</Text>
											</View>
											<Text
												style={{
													fontWeight: 'medium',
													fontSize: 16,
													color: colors.secondText,
												}}
											>
												(99 reviews)
											</Text>
										</View>
									</View>

									<View style={{ flex: 1, marginVertical: 16 }}>
										<Line />
									</View>

									<View>
										<Text
											style={{
												fontSize: 16,
												fontWeight: '700',
												marginLeft: 8,
											}}
										>
											Color
										</Text>
										<View
											style={{
												flex: 1,
												flexWrap: 'wrap',
												flexDirection: 'row',
												gap: 12,
											}}
										>
											<View style={[style.rowCenter]}>
												<RadioButton
													status="checked"
													color={colors.brand}
													value="first"
												/>
												<Text>Black</Text>
											</View>
											<View style={[style.rowCenter]}>
												<RadioButton
													status="unchecked"
													color={colors.brand}
													value="first"
												/>
												<Text>White</Text>
											</View>
											<View style={[style.rowCenter]}>
												<RadioButton
													status="unchecked"
													color={colors.brand}
													value="first"
												/>
												<Text>Pink</Text>
											</View>
										</View>
									</View>

									<View style={{ flex: 1, marginVertical: 16 }}>
										<Line />
									</View>

									<View>
										<Text
											style={{
												fontSize: 16,
												fontWeight: '700',
												marginLeft: 8,
											}}
										>
											Option
										</Text>
										<View
											style={{
												flex: 1,
												flexWrap: 'wrap',
												flexDirection: 'row',
												gap: 12,
											}}
										>
											<View style={[style.rowCenter]}>
												<RadioButton
													status="checked"
													color={colors.brand}
													value="first"
												/>
												<Text>Black</Text>
											</View>
											<View style={[style.rowCenter]}>
												<RadioButton
													status="unchecked"
													color={colors.brand}
													value="first"
												/>
												<Text>White</Text>
											</View>
											<View style={[style.rowCenter]}>
												<RadioButton
													status="unchecked"
													color={colors.brand}
													value="first"
												/>
												<Text>Pink</Text>
											</View>
										</View>
									</View>
									<View style={{ flex: 1, marginVertical: 16 }}>
										<Line />
									</View>

									<View>
										<Text
											style={{
												fontSize: 16,
												fontWeight: '700',
												marginLeft: 8,
											}}
										>
											Quantity
										</Text>
										<View
											style={{
												flex: 1,
												flexWrap: 'wrap',
												flexDirection: 'row',
												gap: 12,
											}}
										>
											<View style={[style.rowCenter, { gap: 20 }]}>
												<Pressable
													style={{
														padding: 8,
														borderRadius: 4,
													}}
												>
													<Minus
														width={20}
														height={20}
														color={colors.secondText}
													/>
												</Pressable>
												<Text style={{ margin: 0 }}>1</Text>
												<Pressable
													style={{
														padding: 8,
														backgroundColor: colors.brand,
														borderRadius: 4,
													}}
												>
													<Add
														width={20}
														height={20}
														color={colors.mainBackground}
													/>
												</Pressable>
											</View>
										</View>
										<Pressable
											style={{
												flex: 1,
												backgroundColor: colors.brand,
												paddingVertical: 8,
												borderRadius: 4,
												marginTop: 16,
											}}
										>
											<Text
												style={[
													style.headerText,
													{
														textAlign: 'center',
														color: colors.textBrand,
													},
												]}
											>
												Add To Cart
											</Text>
										</Pressable>
									</View>
								</ScrollView>
							</Surface>
						</Modal>
					</Portal>
				</>
			)}
		</View>
	);
};

const { height } = Dimensions.get('window');

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
