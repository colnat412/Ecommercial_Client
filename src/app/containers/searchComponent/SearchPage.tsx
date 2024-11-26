import {
	BestDeal,
	Cancel,
	Location,
	Protect,
	Return,
	Star,
} from '@/src/assets';
import { colors, style } from '@/src/constants';
import { Product } from '@/src/types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useEffect, useRef, useState } from 'react';
import {
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { Modal, Portal, RadioButton, Text } from 'react-native-paper';
import {
	DismissKeyboardView,
	Line,
	ProductItemVertical,
} from '../../components';
import { HeaderTitle } from '../../navigation/components';
import { searchProduct, searchProductByPriceRange } from './handle';
import { SearchInput } from './SearchInput';
interface shippingOptionsProps {
	instant: boolean;
	express: boolean;
	standard: boolean;
}

interface OthersOptionsProps {
	return: boolean;
	protect: boolean;
	bestDeal: boolean;
	shipToStore: boolean;
}

export const SearchPage = () => {
	const [data, setData] = useState<Product[]>([]);
	const [filteredData, setFilteredData] = useState<Product[]>([]);

	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [priceRange, setPriceRange] = useState<number[]>([0, 800]);
	const [shippingOptions, setShippingOptions] = useState<shippingOptionsProps>(
		{
			instant: false,
			express: false,
			standard: true,
		},
	);
	const [othersOptions, setOthersOptions] = useState<OthersOptionsProps>({
		return: true,
		protect: false,
		bestDeal: false,
		shipToStore: false,
	});

	const [rating, setRating] = useState<number>(5);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const handleVisible = () => {
		setIsVisible(!isVisible);
	};

	const handleRating = (value: number) => {
		setRating(value);
	}

	const handleShippingOptions = (option: number) => {
		setShippingOptions({
			instant: option === 1,
			express: option === 2,
			standard: option === 3,
		});
	};

	const handleOthersOption = (option: number) => {
		setOthersOptions({
			return: option === 1,
			protect: option === 2,
			bestDeal: option === 3,
			shipToStore: option === 4,
		});
	};

	const handleConfirmModal = () => {
		// searchProductByPriceRange(priceRange[0], priceRange[1]).then((data) => {
		// 	setData(data);
		// });

		const productData = data.filter(
			(product) =>
				product.price >= priceRange[0] &&
				product.price <= priceRange[1] &&
				product.rating >= rating
		);

		setFilteredData(productData);

		setIsVisible(false);
	};

	const handleSearch = (text: string) => {
		// Xóa timer cũ nếu người dùng tiếp tục nhập
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Đặt timer mới
		timeoutRef.current = setTimeout(() => {
			if (text === '') {
				setData([]);
			} else {
				handleSearchResult(text);
			}
		}, 500); // Trì hoãn 500ms
	};
	const handleSearchResult = async (text: string) => {
		const response = await searchProduct(text);
		if (response && response.data && response.statusCode === 200) {
			setData(response.data);
		} else {
			setData([]);
		}
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<DismissKeyboardView>
			<View style={[style.body]}>
				<HeaderTitle title="Search" />

				<View style={{ flex: 1, padding: 4 }}>
					<View style={{ height: 40, paddingHorizontal: 4 }}>
						<SearchInput
							handleSearch={handleSearch}
							handleShowFilter={handleVisible}
						/>
					</View>
					{filteredData.length > 0 ? (
						<FlatList
							data={filteredData}
							renderItem={({ item, index }) => (
								<ProductItemVertical index={index} product={item} />
							)}
							numColumns={2}
							contentContainerStyle={{ padding: 8, gap: 8 }}
							keyExtractor={(item) => item.id.toString()}
						/>
					) : (
						<FlatList
							data={data}
							renderItem={({ item, index }) => (
								<ProductItemVertical index={index} product={item} />
							)}
							numColumns={2}
							contentContainerStyle={{ padding: 8, gap: 8 }}
							keyExtractor={(item) => item.id.toString()}
						/>
					)}
				</View>
				<Portal>
					<Modal
						style={{ justifyContent: 'flex-end' }}
						visible={isVisible}
						onDismiss={handleVisible}
						contentContainerStyle={[styles.modalContainer]}
					>
						<ScrollView
							style={{ height: '70%' }}
							scrollEnabled
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						>
							<View style={{}}>
								<View
									style={[
										styles.header,
										{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginVertical: 4,
										},
									]}
								>
									<View style={{ flex: 1 }}>
										<Text
											style={{ fontWeight: 'bold', fontSize: 20 }}
										>
											FILTER
										</Text>
									</View>
									<Pressable
										onPress={() => setIsVisible(false)}
										style={{ flex: 1, alignItems: 'flex-end' }}
									>
										<Cancel color={'black'} />
									</Pressable>
								</View>
								<Line />
								<View style={styles.shippingOptionsContainer}>
									<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
										Shipping options
									</Text>
									<View style={styles.option}>
										<RadioButton
											onPress={() => handleShippingOptions(1)}
											status={
												shippingOptions.instant
													? 'checked'
													: 'unchecked'
											}
											value="instant"
										/>
										<Text>Instant (2 hours delivery)</Text>
									</View>
									<View style={styles.option}>
										<RadioButton
											onPress={() => handleShippingOptions(2)}
											status={
												shippingOptions.express
													? 'checked'
													: 'unchecked'
											}
											value="express"
										/>
										<Text>Express (2 days delivery)</Text>
									</View>
									<View style={styles.option}>
										<RadioButton
											onPress={() => handleShippingOptions(3)}
											status={
												shippingOptions.standard
													? 'checked'
													: 'unchecked'
											}
											value="standard"
										/>
										<Text>Standard (7-10 days delivery)</Text>
									</View>
								</View>
								<Line />
								<View style={styles.priceRangeContainer}>
									<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
										Price range
									</Text>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<View
											style={{
												borderWidth: 0.5,
												padding: 10,
												maxWidth: 100,
												width: 100,
												borderRadius: 6,
											}}
										>
											<Text style={{ fontWeight: 'bold' }}>
												$ {priceRange[0]}
											</Text>
										</View>
										<View
											style={{
												borderWidth: 0.5,
												padding: 10,
												maxWidth: 100,
												width: 100,
												borderRadius: 6,
											}}
										>
											<Text style={{ fontWeight: 'bold' }}>
												$ {priceRange[1]}
											</Text>
										</View>
									</View>
									<MultiSlider
										containerStyle={{
											justifyContent: 'center',
											alignItems: 'center',
										}}
										sliderLength={360}
										values={[priceRange[0], priceRange[1]]}
										min={0}
										max={1000}
										onValuesChange={(value) => setPriceRange(value)}
										step={1}
									/>
								</View>
								<Line />
								<View style={styles.ratingContainer}>
									<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
										Average review
									</Text>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 16,
										}}
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
										<Text>& Up</Text>
									</View>
								</View>
								<Line />
								<View style={styles.othersContainer}>
									<Text
										style={{
											fontWeight: 'bold',
											fontSize: 16,
											padding: 16,
										}}
									>
										Others
									</Text>
									<View style={{ gap: 8 }}>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
											}}
										>
											<Pressable
												onPress={() => handleOthersOption(1)}
												style={[
													styles.others,
													othersOptions.return && {
														borderColor: colors.brand,
													},
												]}
											>
												<Return
													color={
														othersOptions.return
															? colors.brand
															: undefined
													}
													width={40}
													height={40}
												/>
												<Text
													style={{
														color: othersOptions.return
															? colors.brand
															: undefined,
													}}
												>
													30-day Free Return
												</Text>
											</Pressable>
											<Pressable
												onPress={() => handleOthersOption(2)}
												style={[
													styles.others,
													othersOptions.protect && {
														borderColor: colors.brand,
													},
												]}
											>
												<Protect
													color={
														othersOptions.protect
															? colors.brand
															: undefined
													}
													width={40}
													height={40}
												/>
												<Text
													style={{
														color: othersOptions.protect
															? colors.brand
															: undefined,
													}}
												>
													Buyer Protection
												</Text>
											</Pressable>
										</View>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
											}}
										>
											<Pressable
												onPress={() => handleOthersOption(3)}
												style={[
													styles.others,
													othersOptions.bestDeal && {
														borderColor: colors.brand,
													},
												]}
											>
												<BestDeal
													color={
														othersOptions.bestDeal
															? colors.brand
															: undefined
													}
													width={40}
													height={40}
												/>
												<Text
													style={{
														color: othersOptions.bestDeal
															? colors.brand
															: undefined,
													}}
												>
													Best Deal
												</Text>
											</Pressable>
											<Pressable
												onPress={() => handleOthersOption(4)}
												style={[
													styles.others,
													othersOptions.shipToStore && {
														borderColor: colors.brand,
													},
												]}
											>
												<Location
													color={
														othersOptions.shipToStore
															? colors.brand
															: undefined
													}
													width={40}
													height={40}
												/>
												<Text
													style={{
														color: othersOptions.shipToStore
															? colors.brand
															: undefined,
													}}
												>
													Ship to store
												</Text>
											</Pressable>
										</View>
									</View>
								</View>
								<Pressable
									onPress={handleConfirmModal}
									style={[
										style.button,
										{ padding: 10, marginTop: 10 },
									]}
								>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>
										Confirm
									</Text>
								</Pressable>
							</View>
						</ScrollView>
					</Modal>
				</Portal>
			</View>
		</DismissKeyboardView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modalContainer: {
		backgroundColor: 'white',
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
		padding: 16,
		gap: 5,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	shippingOptionsContainer: {
		padding: 16,
		gap: 5,
	},
	option: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	priceRangeContainer: {
		padding: 16,
		gap: 16,
	},
	ratingContainer: {
		padding: 16,
		gap: 16,
	},
	othersContainer: {
		gap: 8,
	},
	others: {
		borderWidth: 0.5,
		padding: 20,
		alignItems: 'center',
		width: 180,
		gap: 10,
		borderRadius: 5,
	},
});
