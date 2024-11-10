import { Edit, Package, StarProduct } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, shadow, Text, TextInput } from 'react-native-paper';
import { HeaderTitle } from '../navigation/components';
import { useState } from 'react';
import { DismissKeyboardView } from '../components';
import { StackScreenAccountNavigationProp } from '@/src/libs';
import { useNavigation } from '@react-navigation/native';

export const Account = () => {
	const navigation = useNavigation<StackScreenAccountNavigationProp>();
	const [editDetail, setEditDetail] = useState<boolean>(false);

	const handleEditDetail = () => {
		setEditDetail(!editDetail);
	};

	const [editSecurity, setEditSecurity] = useState<boolean>(false);

	const handleEditSecurity = () => {
		setEditSecurity(!editSecurity);
	};

	return (
		<DismissKeyboardView>
			<View
				style={{
					flex: 1,
					justifyContent: 'flex-start',
					backgroundColor: colors.mainBackground,
				}}
			>
				<HeaderTitle title="Account" />
				<ScrollView
					style={{ backgroundColor: colors.mainBackground }}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				>
					<View
						style={{
							paddingHorizontal: 16,
							paddingVertical: 16,
							gap: 10,
						}}
					>
						<LinearGradient
							colors={[colors.brand, colors.linear]}
							style={[
								style.rowCenter,
								{
									paddingVertical: 8,
									gap: 30,
									justifyContent: 'flex-start',
									paddingHorizontal: 12,
									borderRadius: 12,
								},
							]}
						>
							<Image
								source={{
									uri: 'https://i.pinimg.com/736x/fa/f7/b4/faf7b4ad7ff3df8a25310829df2d54ab.jpg',
								}}
								width={95}
								height={95}
								style={{
									borderRadius: 100,
									borderWidth: 2,
									borderColor: colors.textBrand,
									overlayColor: 'color',
								}}
							/>
							<View
								style={[
									style.columnCenter,
									{ width: 'auto', alignItems: 'flex-start' },
								]}
							>
								<Text
									style={[
										style.headerText,
										{ color: colors.textBrand },
									]}
								>
									Phùng Anh Minh
								</Text>
								<Text
									style={[
										{
											color: colors.disable,
											backgroundColor: colors.textBrand,
											borderRadius: 4,
											paddingVertical: 4,
											paddingHorizontal: 12,
											fontSize: 12,
										},
									]}
								>
									dieglevel
								</Text>
							</View>
						</LinearGradient>

						<View
							style={[
								style.body,
								styles.shadow,
								{
									backgroundColor: colors.background,
									gap: 10,
									alignItems: 'center',
									paddingHorizontal: 16,
									borderRadius: 8,
									paddingVertical: 16,
								},
							]}
						>
							<Text style={[style.headerText, { width: '100%' }]}>
								Deliveries
							</Text>
							<View
								style={{
									width: '100%',
									height: 0.5,
									backgroundColor: colors.outline,
								}}
							/>
							<View style={[style.rowCenterCenter, { gap: 120 }]}>
								<Pressable
									onPress={() => navigation.navigate('Order')}
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										gap: 4,
									}}
								>
									<Package width={25} height={25} />
									<Text>Order</Text>
								</Pressable>
								<View
									style={{
										justifyContent: 'center',
										alignItems: 'center',
										gap: 4,
									}}
								>
									<StarProduct width={25} height={25} />
									<Text>Feedback</Text>
								</View>
							</View>
						</View>

						<View
							style={[
								style.body,
								styles.shadow,
								{
									backgroundColor: colors.background,
									gap: 10,
									alignItems: 'center',
									paddingHorizontal: 16,
									borderRadius: 8,
									paddingVertical: 16,
								},
							]}
						>
							<View style={[style.rowCenterBetween, { width: '100%' }]}>
								<Text style={[style.headerText]}>Details</Text>
								{!editDetail && (
									<Pressable onPress={handleEditDetail}>
										<Edit
											color={colors.secondText}
											width={15}
											height={15}
										/>
									</Pressable>
								)}
							</View>
							<View
								style={{
									width: '100%',
									height: 0.5,
									backgroundColor: colors.outline,
								}}
							/>
							<View style={[style.columnCenter, { gap: 20 }]}>
								<TextFields
									edit={editDetail}
									label="Fullname"
									value="Phùng Anh Minh"
								/>
								<TextFields
									edit={editDetail}
									label="Address"
									value="100 Sơn Hòa, Phú Yên"
								/>
								<TextFields
									edit={editDetail}
									label="Phone"
									value="0123456789"
								/>
								<TextFields
									edit={editDetail}
									label="Email"
									value="Dieglevel@gmail.com"
								/>
							</View>

							{editDetail && (
								<View style={[style.rowCenter, { gap: 12 }]}>
									<Button
										mode="contained"
										style={{ borderRadius: 8 }}
										buttonColor={colors.secondText}
										onPress={handleEditDetail}
									>
										Cancel
									</Button>
									<Button
										mode="contained"
										style={{ borderRadius: 8 }}
										buttonColor={colors.brand}
									>
										Save
									</Button>
								</View>
							)}
						</View>

						<View
							style={[
								style.body,
								styles.shadow,
								{
									backgroundColor: colors.background,
									gap: 10,
									alignItems: 'center',
									paddingHorizontal: 16,
									borderRadius: 8,
									paddingVertical: 16,
								},
							]}
						>
							<View style={[style.rowCenterBetween, { width: '100%' }]}>
								<Text style={[style.headerText]}>Details</Text>
								{!editSecurity && (
									<Pressable onPress={handleEditSecurity}>
										<Edit
											color={colors.secondText}
											width={15}
											height={15}
										/>
									</Pressable>
								)}
							</View>
							<View
								style={{
									width: '100%',
									height: 0.5,
									backgroundColor: colors.outline,
								}}
							/>
							<View style={[style.columnCenter, { gap: 20 }]}>
								<TextFields
									label="Password"
									secureTextEntry={true}
									edit={editSecurity}
								/>
								{editSecurity && (
									<TextFields
										label="Repeat Password"
										secureTextEntry={true}
										edit={true}
									/>
								)}
							</View>
							{editSecurity && (
								<View style={[style.rowCenter, { gap: 12 }]}>
									<Button
										mode="contained"
										style={{ borderRadius: 8 }}
										buttonColor={colors.secondText}
										onPress={handleEditSecurity}
									>
										Cancel
									</Button>
									<Button
										mode="contained"
										style={{ borderRadius: 8 }}
										buttonColor={colors.brand}
									>
										Save
									</Button>
								</View>
							)}
						</View>
					</View>
				</ScrollView>
			</View>
		</DismissKeyboardView>
	);
};

interface TextFieldsProps {
	label: string;
	value?: string;
	edit?: boolean;
	secureTextEntry?: boolean;
}

const TextFields = ({
	label,
	value = '************',
	edit = false,
	secureTextEntry = false,
}: TextFieldsProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<View
			style={[
				style.rowCenter,
				{
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					flex: 1,
				},
			]}
		>
			<Text style={[{ minWidth: '20%', fontWeight: 'bold' }]}>{label}:</Text>
			{edit ? (
				<View style={[style.rowCenter, { flex: 1 }]}>
					<TextInput
						secureTextEntry={secureTextEntry && showPassword}
						mode="outlined"
						placeholderTextColor={colors.secondText}
						style={{ flex: 1, height: 10 }}
						activeOutlineColor={colors.brand}
						contentStyle={{ padding: 0 }}
						underlineStyle={{ borderWidth: 0 }}
						outlineStyle={{
							margin: 0,
							padding: 0,
							borderRadius: 0,
							borderWidth: 0,
							borderBottomWidth: 1,
						}}
						placeholder={secureTextEntry ? '' : value}
					/>
					{secureTextEntry && (
						<Pressable
							onPress={() => setShowPassword(!showPassword)}
						></Pressable>
					)}
				</View>
			) : (
				<Text style={[{ flex: 1 }]}>{value}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
});
