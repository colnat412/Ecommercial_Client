// src/Chat.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { ChatComponent } from '../components';
import { colors } from '@/src/constants';
import { TextInput } from 'react-native-paper';
import { Send } from '@/src/assets';
import { HeaderTitle } from '../navigation/components/HeaderTitle';
import { StackScreenNavigationProp, useAppSelector } from '@/src/libs';
import { BE_URL_CHAT } from '@/env';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { DetailInformation } from '@/src/types';

interface Message {
	sender: string;
	message: string;
	image?: string;
}

export const Chat: React.FC = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const navigation = useNavigation<StackScreenNavigationProp>();

	const [message, setMessage] = useState<string>('');

	const accessToken: string | null = useAppSelector((state) =>
		state.auth.account?.accessToken ? state.auth.account?.accessToken : null,
	);

	const accountId: string | null = useAppSelector((state) =>
		state.auth.account?.id ? state.auth.account?.id : null,
	);

	const detailInformation: DetailInformation | null = useAppSelector((state) =>
		state.detailInfomation ? state.detailInfomation.detailInfomation : null,
	);

	const focus = useIsFocused();
	
	useEffect(() => {
		setMessages([]);
		const token = async () => {
			if (!accessToken) {
				return;
			}
			const newSocket = io(`${BE_URL_CHAT}`, {
				transports: ['websocket'],
				extraHeaders: {
					authorization: accessToken ? `${accessToken}` : '',
				},
			});



			newSocket.emit('joinRoom', {
				owner_id: accountId,
			});

			newSocket.on('oldMessages', (messages: any) => {
				const messageArray: Message[] = messages.messages.map(
					(message: any) => {
						return {
							sender: message.account.id,
							message: message.content,
						};
					},
				);

				setMessages(messageArray);
				setLoading(false);
			});
			setSocket(newSocket);
			console.log('connected');
		};

		if (focus) {
			setLoading(true);
		}
		if (accessToken) {
			token();
		} else {
			navigation.navigate('Login');
		}

		if (socket && focus === false) {
			socket.disconnect();
		}

		if (!focus){
			setLoading(true);
		}
	}, [focus]);

	useEffect(() => {
		if (socket) {
			socket.on('message', (message: any) => {
				setMessages((prev) => [
					...prev,
					{
						sender: message.sender.id,
						message: message.message,
					},
				]);
			});
		}
	}, [socket?.on]);

	const handleSendMessage = () => {
		if (socket && message) {
			socket.emit('message', {
				content: message,
			});

			setMessage('');
		}
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'flex-start',
				backgroundColor: colors.mainBackground,
			}}
		>
			<HeaderTitle title="Chat" />
			{loading ? (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator size={'large'} color={colors.brand} />
				</View>
			) : (
				<View
					style={{
						gap: 10,
						flex: 1,
						justifyContent: 'flex-end',
					}}
				>
					<FlatList
						inverted
						style={{ paddingHorizontal: 8 }}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						scrollEnabled={true}
						data={messages.toReversed()}
						renderItem={({ item }) => (
							<ChatComponent
								message={item.message}
								image={
									item.sender === accountId
										? detailInformation?.avatar_url
											? detailInformation.avatar_url
											: 'https://i.pinimg.com/736x/e9/6f/fb/e96ffb0a7aba1f17f686a15f368b5d58.jpg'
										: 'https://i.pinimg.com/736x/e9/6f/fb/e96ffb0a7aba1f17f686a15f368b5d58.jpg'
								}
								sender={
									item.sender === accountId ? 'sending' : 'receiving'
								}
							/>
						)}
					/>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							gap: 8,
							flexDirection: 'row',
							paddingHorizontal: 8,
						}}
					>
						<TextInput
							style={{ height: 40, flex: 1 }}
							placeholder="Message"
							mode="outlined"
							contentStyle={{ paddingVertical: 2 }}
							activeOutlineColor={colors.brand}
							value={message}
							onChangeText={(text) => setMessage(text)}
						/>
						<Pressable
							onPress={handleSendMessage}
							style={{
								backgroundColor: colors.brand,
								borderRadius: 4,
								padding: 8,
							}}
						>
							<Send color={colors.background} />
						</Pressable>
					</View>
				</View>
			)}
		</View>
	);
};
