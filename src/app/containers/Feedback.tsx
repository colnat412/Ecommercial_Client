import { BE_URL } from '@/env';
import { colors, style } from '@/src/constants';
import { StackScreenNavigationProp } from '@/src/libs';
import { Product } from '@/src/types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Line, ProductList } from '../components';
import { HeaderTitleWithBack } from '../navigation/components';
import {
	Button,
	Dialog,
	Modal,
	Paragraph,
	Portal,
	Surface,
	Text,
} from 'react-native-paper';
import { Cancel, Star } from '@/src/assets';

export const Feedback = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();

	const [productData, setProductData] = useState<Product[]>([]);
	const [visibleCart, setVisibleCart] = useState<boolean>(false);

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
							<View style={[style.rowCenterBetween, { flex: 1 }]}></View>

						</ScrollView>
					</Surface>
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
