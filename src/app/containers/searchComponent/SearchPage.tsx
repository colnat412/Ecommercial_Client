import { Image, Pressable, StyleSheet, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Checkbox, Modal, Portal, Text } from 'react-native-paper';
import { SearchInput } from './SearchInput';
import { Line } from '../../components';
import { useState } from 'react';
import {
	BestDeal,
	Cancel,
	Location,
	Protect,
	Return,
	Star,
} from '@/src/assets';
import { style } from '@/src/constants';

export const SearchPage = () => {
	const [priceRange, setPriceRange] = useState<number[]>([200, 800]);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleVisible = () => {
		setIsVisible(!isVisible);
	};

	return (
		<View style={styles.container}>
			<SearchInput handleShowFilter={handleVisible} />
			<Portal>
				<Modal
					visible={isVisible}
					onDismiss={handleVisible}
					contentContainerStyle={styles.modalContainer}
				>
					<View
						style={[
							styles.header,
							{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							},
						]}
					>
						<View style={{ flex: 1 }} />
						<View style={{ flex: 1, alignItems: 'center' }}>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
								FILTER
							</Text>
						</View>
						<View style={{ flex: 1, alignItems: 'flex-end' }}>
							<Cancel color={'black'} />
						</View>
					</View>
					<View style={styles.shippingOptionsContainer}>
						<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
							Shipping options
						</Text>
						<View style={styles.option}>
							<Checkbox status="checked" />
							<Text>Instant(2 hours delivery)</Text>
						</View>
						<View style={styles.option}>
							<Checkbox status="checked" />
							<Text>Express(2 days delivery)</Text>
						</View>
						<View style={styles.option}>
							<Checkbox status="checked" />
							<Text>Standard(7-10 days delivery)</Text>
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
							values={[200, 800]}
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
							<Pressable>
								<Star width={27} height={27} />
							</Pressable>
							<Pressable>
								<Star width={27} height={27} />
							</Pressable>
							<Pressable>
								<Star width={27} height={27} />
							</Pressable>
							<Pressable>
								<Star width={27} height={27} />
							</Pressable>
							<Pressable>
								<Star width={27} height={27} />
							</Pressable>
							<Text>& Up</Text>
						</View>
					</View>
					<Line />
					<View style={styles.othersContainer}>
						<Text
							style={{ fontWeight: 'bold', fontSize: 16, padding: 16 }}
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
								<Pressable style={styles.others}>
									<Return width={40} height={40} />
									<Text>30-day Free Return</Text>
								</Pressable>
								<Pressable style={styles.others}>
									<Protect width={40} height={40} />
									<Text>Buyer Protection</Text>
								</Pressable>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
								}}
							>
								<Pressable style={styles.others}>
									<BestDeal width={40} height={40} />
									<Text>Best Deal</Text>
								</Pressable>
								<Pressable style={styles.others}>
									<Location width={40} height={40} />
									<Text>Ship to store</Text>
								</Pressable>
							</View>
						</View>
					</View>
					<Pressable style={[style.button, { padding: 10 }]}>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>
							Confirm
						</Text>
					</Pressable>
				</Modal>
			</Portal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modalContainer: {
		backgroundColor: 'white',
		borderRadius: 10,
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
