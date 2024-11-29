import { Edit, Package, StarProduct } from '@/src/assets';
import { colors, style } from '@/src/constants';
import {
	AppDispatch,
	setAccessToken,
	setAccessTokenSecure,
	StackScreenNavigationProp,
	useAppDispatch,
	useAppSelector,
} from '@/src/libs';
import {
	setAuth,
	setCart,
	setDetailInfomation,
	setFavorite,
	setOrder,
} from '@/src/libs/redux/store';
import { setFeedback } from '@/src/libs/redux/store/feedbackSlice';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { DismissKeyboardView } from '../../components';
import { fetchDetailInformation } from '../../localHandle';
import { HeaderTitle } from '../../navigation/components/HeaderTitle';
import {
	fetchUpdateDetailInformation,
	fetchUpdatePassword,
} from '../register/handle';

export const Account = () => {
	const navigation = useNavigation<StackScreenNavigationProp>();

	const [loading, setLoading] = useState<boolean>(true);

	const detailsInformation = useAppSelector((state) => state.detailInfomation);
	const account = useAppSelector((state) => state.auth?.account);
	const dispatch = useAppDispatch<AppDispatch>();

	const [editDetail, setEditDetail] = useState<boolean>(false);

	const [fullname, setFullname] = useState<string>(
		detailsInformation.detailInfomation?.full_name || '',
	);
	const [address, setAddress] = useState<string>(
		detailsInformation.detailInfomation?.address || '',
	);
	const [phone, setPhone] = useState<string>(
		detailsInformation.detailInfomation?.phone || '',
	);

	const handleEditDetail = () => {
		setEditDetail(!editDetail);
	};

	const [editSecurity, setEditSecurity] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [repeatPassword, setRepeatPassword] = useState<string>('');
	const [currentPassword, setCurrentPassword] = useState<string>('');

	const [error, setError] = useState<string>('');

	const handleCancelEditSecurity = () => {
		setEditSecurity(!editSecurity);
		setPassword('');
		setRepeatPassword('');
		setCurrentPassword('');
	};

	const handleSaveEditSecurity = async () => {
		if (password !== repeatPassword) {
			setError('Password not match');
			return;
		}

		const response = await fetchUpdatePassword(currentPassword, password);
		if (response && response.statusCode === 200) {
			Alert.alert('Success', 'Update password success');
			setError('');
			setEditSecurity(!editSecurity);
			setPassword('');
			setRepeatPassword('');
			setCurrentPassword('');
		}
		else if (response){
			setError(response.message);
			
		}
		setEditSecurity(!editSecurity);
		setPassword('');
		setRepeatPassword('');
		setCurrentPassword('');
	};

	const handleLogout = () => {
		setAccessToken('');
		setAccessTokenSecure('');

		dispatch(setAuth(null));
		dispatch(setDetailInfomation(null));
		dispatch(setFavorite(null));
		dispatch(setFeedback(null));
		dispatch(setCart(null));
		dispatch(setOrder(null));

		navigation.navigate('Login');
	};

	const handleUpdateDetail = async () => {
		const result = await fetchUpdateDetailInformation({
			fullname,
			address,
			phone,
		});

		if (result && result.statusCode === 200) {
			dispatch(setDetailInfomation(result.data));
			setEditDetail(false);

			const detailInformation = await fetchDetailInformation();
			dispatch(setDetailInfomation(detailInformation?.data || null));
		}
	};

	const isFocused = useIsFocused();

	useEffect(() => {
		if (detailsInformation.detailInfomation === null) {
			navigation.navigate('Login');
		} else {
			setLoading(false);
		}
		if (!isFocused) {
			setLoading(true);
		}
	}, [isFocused]);

	return (
		<DismissKeyboardView>
			<View
				style={{
					flex: 1,
					justifyContent: loading ? 'center' : 'flex-start',
					backgroundColor: colors.mainBackground,
				}}
			>
				<HeaderTitle title="Account" />
				{loading ? (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<ActivityIndicator color={colors.brand} size={'large'} />
					</View>
				) : (
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
										uri: detailsInformation.detailInfomation
											?.avatar_url,
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
										Welcome back!
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
										{detailsInformation.detailInfomation?.full_name}
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
									<Pressable
										onPress={() => navigation.navigate('Feedback')}
										style={{
											justifyContent: 'center',
											alignItems: 'center',
											gap: 4,
										}}
									>
										<StarProduct width={25} height={25} />
										<Text>Feedback</Text>
									</Pressable>
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
								<View
									style={[style.rowCenterBetween, { width: '100%' }]}
								>
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
										value={fullname}
										onChangeText={setFullname}
									/>
									<TextFields
										edit={editDetail}
										label="Address"
										value={address}
										onChangeText={setAddress}
									/>
									<TextFields
										edit={editDetail}
										label="Phone"
										value={phone}
										onChangeText={setPhone}
									/>
									<TextFields
										edit={editDetail}
										label="Email"
										value={account?.email}
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
											onPress={handleUpdateDetail}
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
								<View
									style={[style.rowCenterBetween, { width: '100%' }]}
								>
									<Text style={[style.headerText]}>Details</Text>
									{!editSecurity && (
										<Pressable onPress={handleCancelEditSecurity}>
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
									{error !== '' && (
										<>
											<Text style={{ color: 'red' }}>{error}</Text>
										</>
									)}
									{editSecurity ? (
										<>
											<TextFields
												label="Current Password"
												secureTextEntry={true}
												edit={true}
												value={currentPassword}
												onChangeText={setCurrentPassword}
											/>
											<TextFields
												label="New Password"
												secureTextEntry={true}
												edit={true}
												value={password}
												onChangeText={setPassword}
											/>
											<TextFields
												label="Repeat Password"
												secureTextEntry={true}
												edit={true}
												value={repeatPassword}
												onChangeText={setRepeatPassword}
											/>
										</>
									) : (
										<TextFields
											label="Password"
											secureTextEntry={true}
											edit={editSecurity}
										/>
									)}
								</View>
								{editSecurity && (
									<View style={[style.rowCenter, { gap: 12 }]}>
										<Button
											mode="contained"
											style={{ borderRadius: 8 }}
											buttonColor={colors.secondText}
											onPress={handleCancelEditSecurity}
										>
											Cancel
										</Button>
										<Button
											mode="contained"
											style={{ borderRadius: 8 }}
											buttonColor={colors.brand}
											onPress={handleSaveEditSecurity}
										>
											Save
										</Button>
									</View>
								)}
							</View>
							<Button
								onPress={handleLogout}
								mode="contained"
								style={{ borderRadius: 8 }}
								buttonColor={colors.brand}
							>
								Log out
							</Button>
						</View>
					</ScrollView>
				)}
			</View>
		</DismissKeyboardView>
	);
};

interface TextFieldsProps {
	label: string;
	value?: string;
	edit?: boolean;
	secureTextEntry?: boolean;
	onChangeText?: (text: string) => void;
}

const TextFields = ({
	label,
	value = '',
	edit = false,
	secureTextEntry = false,
	onChangeText,
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
						value={value}
						onChangeText={onChangeText}
						secureTextEntry={secureTextEntry && showPassword}
						mode="outlined"
						placeholderTextColor={colors.secondText}
						style={{
							flex: 1,
							height: 10,
							backgroundColor: colors.background,
						}}
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
				<Text style={[{ flex: 1 }]}>
					{secureTextEntry ? '*********' : value}
				</Text>
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
