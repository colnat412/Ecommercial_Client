import { Send } from '@/src/assets';
import { colors, style } from '@/src/constants';
import { FlatList, Pressable, View } from 'react-native';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { ChatComponent } from '../../components';
import { HeaderTitleWithBack } from '../../navigation/components';
import { useEffect, useState } from 'react';
import { Message } from '@/src/types/message';
import { BE_URL_CHAT } from '@/env';
import {
	useIsFocused,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import { DetailInformation } from '@/src/types';
import {
	ChatAdminRouteProp,
	StackScreenNavigationProp,
	useAppSelector,
} from '@/src/libs';
import { io, Socket } from 'socket.io-client';

export const ChatAdmin = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const route = useRoute<ChatAdminRouteProp>();

	const navigation = useNavigation<StackScreenNavigationProp>();

	const [message, setMessage] = useState<string>('');

	const accessToken: string | null = useAppSelector((state) =>
		state.auth.account?.accessToken ? state.auth.account?.accessToken : null,
	);

	const accountId: string | null = useAppSelector((state) =>
		state.auth.account?.id ? state.auth.account?.id : null,
	);

	const detailInformation: DetailInformation | null = useAppSelector(
		(state) =>
			state.detailInfomation
				? state.detailInfomation.detailInfomation
				: null,
	);
	const unsubscribe = navigation.addListener('blur', () => {
		socket?.emit('leaveRoom', {
			owner_id: route.params.userId,
		});
	});

	useEffect(() => {
		setMessages([]);

		if (socket) {
			unsubscribe();
		}

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
			owner_id: route.params.userId,
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

		return () => {
			unsubscribe();
			console.log('out');
		}
	}, []);

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
				owner_id: route.params.userId,
			});

			setMessage('');
		}
	};

	return (
		<View
			style={[
				,
				{
					flex: 1,
					marginTop: 32,
					justifyContent: 'flex-start',
					backgroundColor: colors.mainBackground,
					paddingBottom: 16,
				},
			]}
		>
			<HeaderTitleWithBack title="Chat" />
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
