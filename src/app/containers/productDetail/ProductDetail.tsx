import { colors, style } from '@/src/constants';
import {
	Alert,
	Dimensions,
	FlatList,
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
import {
	Feedback,
	Product,
	ProductDetail as IProductDetail,
	FeedbackProductDetail,
} from '@/src/types';
import {
	addProductToCart,
	getListOptionsOfOption,
	getOptionsOfProduct,
	getProduct,
	getRelationProduct,
	getReviews,
} from './handle';
import { HeaderTitleWithBack } from '../../navigation/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductDetailRouteProp, StackScreenNavigationProp } from '@/src/libs';
import { Line } from '../../components/Line';
import { Option } from '@/src/types/option';
import { ListOption } from '@/src/types/list-option';
import { dateBefore } from '@/src/utils';
import { ProductItemHorizontal } from '../../components';

interface SelectedOptions {
	[key: string]: number;
}

export const ProductDetail = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const route = useRoute<ProductDetailRouteProp>();

	const [loading, setLoading] = useState<boolean>(true);
	const [product, setProduct] = useState<IProductDetail>();
	const [visibleCart, setVisibleCart] = useState<boolean>(false);
	const [feedback, setFeedback] = useState<FeedbackProductDetail[]>([]);

	const [options, setOptions] = useState<Option[] | undefined>([]);
	const [listOptions, setListOptions] = useState<ListOption[][]>([]);
	const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
	const [relationProducts, setRelationProducts] = useState<Product[]>([]);

	const avg = () => {
		let total = 0;
		feedback?.map((item) => {
			total += item.rating;
		});
		return total / feedback?.length;
	};

	const ratingOfTotal = (rating: number) => {
		const total = feedback?.length;
		let count = 0;
		feedback?.map((item) => {
			if (item.rating === rating) {
				count += 1;
			}
		});
		return (count / total) * 100;
	};

	useEffect(() => {
		const getContainer = async () => {
			const productResult = await getProduct(
				route.params?.productId ? route.params.productId : '',
			);
			if (productResult) {
				setProduct(productResult.data ? productResult.data : undefined);
			}

			const feedbackResult = await getReviews(
				route.params?.productId ? route.params.productId : '',
			);

			if (feedbackResult && feedbackResult.statusCode === 200) {
				setFeedback(feedbackResult.data ? feedbackResult.data : []);
			}

			const optionsResult = await getOptionsOfProduct(
				productResult.data?.id ? productResult.data.id : '',
			);
			if (optionsResult) {
				setOptions(optionsResult.data ? optionsResult.data : undefined);

				const listOptionsPromises = optionsResult.data.map((option) =>
					getListOptionsOfOption(option.id),
				);

				const listOptionsResults = await Promise.all(listOptionsPromises);
				setListOptions(
					listOptionsResults.map(
						(result) => result.data as unknown as ListOption[],
					),
				);
			}

			const relationProductsResult = await getRelationProduct();
			if (
				relationProductsResult &&
				relationProductsResult.statusCode === 200
			) {
				setRelationProducts(relationProductsResult.data || []);
			}

			setLoading(false);
		};
		getContainer();
	}, []);

	const toggleModalCart = () => {
		setVisibleCart(!visibleCart);
	};

	const [visibleReviews, setRisibleReviews] = useState<boolean>(false);

	const toggleModalReviews = () => {
		setRisibleReviews(!visibleReviews);
	};

	const handleListOptionSelect = (optionIndex: number, listIndex: number) => {
		setSelectedOptions({
			...selectedOptions,
			[optionIndex]: listIndex,
		});
		console.log('selectedOptions', selectedOptions);
	};

	const addItemToCart = async (
		itemId: string,
		qty: number,
		listOptionId: string[],
	) => {
		try {
			console.log('itemId', itemId);
			console.log('qty', qty);
			console.log('listOptionId', listOptionId);

			const response = await addProductToCart(itemId, qty, listOptionId);
			if (response.status === 200 || response.status === 201) {
				Alert.alert('Success', 'Add to cart success');
			} else {
				Alert.alert('Error', response.message || 'Failed to add to cart');
			}
		} catch (error) {
			Alert.alert('Error', 'An unexpected error occurred');
		}
	};

	const goPayment = () => {
		if (product?.id) {
			navigation.navigate('Cart', { productId: product.id });
		}
		setTimeout(() => {
			Alert.alert('Success', 'Add to cart success'); // set timeout for 2s
		}, 500);
		setVisibleCart(!visibleCart);
	};

	return (
		<View
			style={{
				marginTop: 32,
				flex: 1,
				justifyContent: 'center',
				backgroundColor: colors.mainBackground,
			}}
		>
			{loading ? (
				<ActivityIndicator size={'large'} color={colors.brand} />
			) : (
				<>
					<HeaderTitleWithBack
						title={product?.name ? product?.name : ''}
					/>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						style={[{ backgroundColor: colors.mainBackground }]}
						nestedScrollEnabled={true}
					>
						<View
							style={[
								style.body,
								{ backgroundColor: colors.mainBackground },
							]}
						>
							<View
								style={[
									style.contentBody,
									{ backgroundColor: colors.mainBackground, paddingBottom: 0 },
								]}
							>
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
											uri: product?.image_url,
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
												{avg().toFixed(1)}
											</Text>
										</View>
										<Text
											style={{
												fontWeight: 'medium',
												fontSize: 16,
												color: colors.secondText,
											}}
										>
											{`(${feedback?.length} reviews)`}
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
													{avg().toFixed(1)}/5
												</Text>
											</View>
											<Text
												style={{
													fontWeight: 'medium',
													fontSize: 16,
													color: colors.secondText,
												}}
											>
												({feedback?.length} reviews)
											</Text>
											<View style={[style.rowCenter, { gap: 0 }]}>
												{Array.from(
													{ length: avg() },
													(_, index) => (
														<Star />
													),
												)}
												{Array.from(
													{ length: 5 - avg() },
													(_, index) => (
														<HalfStar />
													),
												)}
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
																width: `${ratingOfTotal(5)}%`,
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
																width: `${ratingOfTotal(4)}%`,
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
																width: `${ratingOfTotal(3)}%`,
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
																width: `${ratingOfTotal(2)}%`,
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
																width: `${ratingOfTotal(1)}%`,
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

								<View style={{ gap: 20, marginTop: 32 }}>
									{feedback ? (
										feedback.slice(0, 5).map((item, index) => (
											<View
												key={index}
												style={[
													style.rowCenterCenter,
													{ gap: 12, alignItems: 'flex-start' },
												]}
											>
												<Image
													source={{
														uri: item.account.detailInformation
															.avatar_url,
													}}
													width={40}
													height={40}
													alt="avatar"
													style={{
														borderRadius: 300,
														borderWidth: 2,
														borderColor: colors.brand,
													}}
												/>
												<View style={{ flex: 1, gap: 4 }}>
													<View style={[style.rowCenterBetween]}>
														<Text
															style={{
																fontWeight: 'bold',
																fontSize: 16,
																color: colors.mainText,
															}}
														>
															{
																item.account.detailInformation
																	.full_name
															}
														</Text>
														<Text
															style={{
																fontSize: 12,
																color: colors.secondText,
															}}
														>
															{dateBefore(
																item.createdAt
																	? new Date(item.createdAt)
																	: new Date(),
															)}
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
							<View>
								<Text
									style={[
										style.headerText,
										{ fontSize: 16, color: colors.mainText, paddingHorizontal: 16 },
									]}
								>
									Relation Products
								</Text>
								<FlatList
									data={relationProducts}
									renderItem={({ item }) => (
										<ProductItemHorizontal product={item} />
									)}
									horizontal={true}
									style={{ paddingHorizontal: 8, paddingVertical: 8 }}
								/>
							</View>
						</View>
					</ScrollView>

					<View
						style={[
							style.rowCenter,
							{
								marginVertical: 4,
								paddingVertical: Platform.OS === 'ios' ? 20 : 4,
								paddingHorizontal: 16,
								marginHorizontal: 4,
								backgroundColor: colors.mainBackground,
								borderWidth: 1,
								borderColor: colors.outline,
								borderRadius: 8,
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
							onPress={() => navigation.navigate('PaymentOption')}
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
											feedback.map((item, index) => (
												<View
													key={index}
													style={[
														style.rowCenterCenter,
														{ gap: 12, alignItems: 'flex-start' },
													]}
												>
													<Image
														source={{
															uri: item.account.detailInformation
																.avatar_url,
														}}
														width={40}
														height={40}
														alt="avatar"
														style={{
															borderRadius: 300,
															borderWidth: 2,
															borderColor: colors.brand,
														}}
													/>
													<View style={{ flex: 1, gap: 4 }}>
														<View
															style={[style.rowCenterBetween]}
														>
															<View style={[style.rowCenter]}>
																<Text
																	style={{
																		fontWeight: 'bold',
																		fontSize: 16,
																		color: colors.mainText,
																		justifyContent: 'center',
																		alignItems: 'center',
																	}}
																>
																	{
																		item.account
																			.detailInformation
																			.full_name
																	}
																</Text>
																<View
																	style={{
																		justifyContent: 'center',
																		alignItems: 'center',
																		flexDirection: 'row',
																	}}
																>
																	<Star
																		width={15}
																		height={15}
																	/>
																	<Text>{item.rating}</Text>
																</View>
															</View>

															<Text
																style={{
																	fontSize: 12,
																	color: colors.secondText,
																}}
															>
																{dateBefore(
																	item.createdAt
																		? new Date(item.createdAt)
																		: new Date(),
																)}
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
											{product?.name ? product?.name : ''}
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
													{avg().toFixed(1)}
												</Text>
											</View>
											<Text
												style={{
													fontWeight: 'medium',
													fontSize: 16,
													color: colors.secondText,
												}}
											>
												({feedback?.length} reviews)
											</Text>
										</View>
									</View>

									<View style={{ flex: 1, marginVertical: 16 }}>
										<Line />
									</View>
									{options &&
										options.length > 0 &&
										options.map((option, index) => (
											<View key={index}>
												<Text
													style={{
														fontSize: 16,
														fontWeight: '700',
														marginLeft: 8,
													}}
												>
													{option.name}
												</Text>
												<View
													style={{
														flex: 1,
														flexWrap: 'wrap',
														flexDirection: 'row',
														gap: 12,
													}}
												>
													{listOptions[index]?.map(
														(listOption, listIndex) => (
															<View
																key={listIndex}
																style={[style.rowCenter]}
															>
																<RadioButton
																	value="first"
																	status={
																		selectedOptions[index] ===
																		listIndex
																			? 'checked'
																			: 'unchecked'
																	}
																	onPress={() =>
																		handleListOptionSelect(
																			index,
																			listIndex,
																		)
																	}
																	color={colors.brand}
																/>
																<Text>{listOption.name}</Text>
															</View>
														),
													)}
												</View>
											</View>
										))}

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
												<Text
													style={{ opacity: 0.5, fontSize: 12 }}
												>
													(100 pieces available)
												</Text>
											</View>
										</View>
										<Pressable
											onPress={() => {
												if (product?.id) {
													const selectedOptionIds = Object.keys(
														selectedOptions,
													).map((optionIndex) => {
														const listIndex =
															selectedOptions[
																optionIndex as unknown as number
															];
														return listOptions[
															optionIndex as unknown as number
														][listIndex].id;
													});
													addItemToCart(
														product.id,
														1,
														selectedOptionIds,
													);
												}
											}}
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
