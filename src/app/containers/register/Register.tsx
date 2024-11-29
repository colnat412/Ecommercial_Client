import {
	api,
	AppDispatch,
	setAccessToken,
	setAccessTokenSecure,
	StackScreenNavigationProp,
	useAppDispatch,
} from '@/src/libs';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { DismissKeyboardView } from '../../components';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { colors, style } from '@/src/constants';
import { Button, Text, TextInput } from 'react-native-paper';
import { GoBack } from '../../navigation/components/GoBack';
import { Add } from '@/src/assets';
import { FileDetails } from '@/src/types/others';
import * as DocumentPicker from 'expo-document-picker';
import { fetchRegister } from './handle';
import {
	setAuth,
	setCart,
	setDetailInfomation,
	setFavorite,
	setFeedback,
	setOrder,
} from '@/src/libs/redux/store';
import { fetchCart, fetchFavorite, fetchFeedback, fetchOrder } from '../../localHandle';

import { login as loginAction } from '../login/handle';

export const Register = () => {
	const [error, setError] = useState('');
	const [file, setFile] = useState<FileDetails | null>(null);
	const navigation = useNavigation<StackScreenNavigationProp>();

	const [fullname, setFullname] = useState<string>();
	const [username, setUsername] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [phone, setPhone] = useState<string>();
	const [address, setAddress] = useState<string>();

	const dispatch =useAppDispatch<AppDispatch>()

	const pickDocument = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: 'image/*',
				copyToCacheDirectory: true,
			});

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
	const handleRegister = async () => {
		try {
			setError('');
			if (
				!fullname ||
				!username ||
				!email ||
				!password ||
				!phone ||
				!address
			) {
				setError('All fields are required');
				return;
			}
			// REGISTER
			const register = await fetchRegister({
				username: username,
				password: password,
				email: email,
			});

			// UPDATE DETAIL INFORMATION

			if(register)

			if (register.statusCode === 201) {
				const avatar = await uploadImage();

				// login
				const login = await api.post('/api/auth/login', {
					identifier: email,
					password: password,
				});

				if (login.data.statusCode === 200) {
					setAccessToken(login.data.data.accessToken);
				}

				const res = await api.patch('/api/detail-information/update', {
					full_name: fullname,
					phone: phone,
					address: address,
					avatar_url: avatar,
				});
				if (res.data.statusCode === 200) {
					navigation.navigate('Login');
				} else {
					setError(res.data.message);
				}

				const resultLogin = await loginAction(username, password);

				if (!resultLogin) {
					return;
				}
				if (resultLogin.statusCode === 200 && resultLogin.data) {
					setAccessToken(resultLogin.data.account.accessToken);
					setAccessTokenSecure(resultLogin.data.account.accessToken);

					dispatch(setAuth({ account: resultLogin.data.account, role: resultLogin.data.role }));

					dispatch(
						setDetailInfomation(resultLogin.data.detailInformation),
					);

					const favoriteData = await fetchFavorite();
					dispatch(setFavorite(favoriteData?.data || []));

					const feebackData = await fetchFeedback();
					dispatch(setFeedback(feebackData?.data || []));

					const cartData = await fetchCart();
					dispatch(setCart(cartData?.data || []));

					const orderData = await fetchOrder()
					dispatch(setOrder(orderData?.data || []));

					navigation.navigate('TabScreenApp');
				}
			} else if (register.statusCode === 401) {
				setError(register.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<DismissKeyboardView>
			<View style={[style.body]}>
				<ScrollView
					style={{ marginTop: 32 }}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				>
					<View style={[style.centerContainer, style.contentBody]}>
						<GoBack />
						<View style={[style.columnCenter, { marginTop: 32 }]}>
							<View
								style={{
									gap: 10,
									marginBottom: 32,
									width: '100%',
									justifyContent: 'flex-start',
									alignItems: 'flex-start',
								}}
							>
								<Text
									style={{
										color: colors.brand,
										fontSize: 30,
										fontWeight: 'bold',
									}}
								>
									Register
								</Text>
							</View>

							<View style={[style.columnCenter]}>
								<Pressable
									onPress={pickDocument}
									style={{
										borderWidth: 4,
										borderColor: colors.brand,
										borderRadius: 300,
										width: 200,
										height: 200,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: colors.background,
									}}
								>
									{file ? (
										<Image
											source={{ uri: file.uri }}
											style={{
												borderWidth: 4,
												borderColor: colors.brand,
												borderRadius: 300,
												width: 200,
												height: 200,
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: colors.background,
											}}
											width={200}
											height={200}
										/>
									) : (
										<Add width={50} height={50} />
									)}
								</Pressable>
								<View style={[style.columnCenter]}>
									{error && (
										<Text
											style={{
												color: colors.dangerous,
												fontSize: 20,
												fontWeight: 'bold',
											}}
										>
											{error}
										</Text>
									)}
									<TextInput
										value={fullname}
										onChangeText={setFullname}
										label="Fullname"
										style={[style.textInput]}
										mode="outlined"
										activeOutlineColor={colors.brand}
									/>
								</View>

								<View style={[style.columnCenter]}>
									<TextInput
										value={username}
										onChangeText={setUsername}
										label="Username"
										style={[style.textInput]}
										mode="outlined"
										activeOutlineColor={colors.brand}
									/>
								</View>

								<View style={[style.columnCenter]}>
									<TextInput
										value={email}
										onChangeText={setEmail}
										label="Email"
										style={[style.textInput]}
										mode="outlined"
										activeOutlineColor={colors.brand}
									/>
								</View>

								<View style={[style.columnCenter]}>
									<TextInput
										value={password}
										onChangeText={setPassword}
										label="Password"
										style={[style.textInput]}
										mode="outlined"
										activeOutlineColor={colors.brand}
										secureTextEntry={true}
									/>
								</View>

								<View style={[style.columnCenter]}>
									<TextInput
										value={phone}
										onChangeText={setPhone}
										label="Phone"
										style={[style.textInput]}
										mode="outlined"
										activeOutlineColor={colors.brand}
										keyboardType="phone-pad"
									/>
								</View>

								<View style={[style.columnCenter]}>
									<TextInput
										value={address}
										onChangeText={setAddress}
										label="Address"
										style={[style.textInput]}
										mode="outlined"
										activeOutlineColor={colors.brand}
									/>
								</View>
							</View>
							<Button
								onPress={handleRegister}
								style={[style.button, { marginTop: 16 }]}
								mode="contained"
								textColor={colors.textBrand}
							>
								Register
							</Button>
						</View>
					</View>
				</ScrollView>
			</View>
		</DismissKeyboardView>
	);
};
