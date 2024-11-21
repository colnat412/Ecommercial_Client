// src/Chat.tsx
import { BE_URL_CHAT } from '@/env';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { ChatComponent } from '../components';
import { colors } from '@/src/constants';
import {TextInput } from 'react-native-paper';
import { Send } from '@/src/assets';
import { HeaderTitle } from '../navigation/components';
import {  useAppSelector } from '@/src/libs';


interface Message {
	sender: 'sending' | 'receiving';
	message: string;
	image?: string;
}

export const Chat: React.FC = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<Message[]>([
		// {
		// 	sender: 'sending',
		// 	message: 'Iphone 5 nhiêu anh',
		// 	image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',
		// },
		// {
		// 	sender: 'sending',
		// 	message: 'bền hông anh ?',
		// 	image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',
		// },
		// {
		// 	sender: 'receiving',
		// 	image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',
		// 	message: 'Ok em',
		// },
		// {
		// 	sender: 'receiving',
		// 	image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',
		// 	message: `xịnsa;dlk;laskdl;saas;dk
		// 		<address>asd
		// 		asd
		// 		asd
		// 		a
		// 		sd
		// 		<aside><data value="asdas
		// 		dataas
		// 		dataasd
		// 		a
		// 		sendMessaged
		// 		as
		// 		dataasdasd
		// 		asdd
		// 		asda
		// 		sda
		// 		sdas
		// 		d
		// 		asdd
		// 		asd
		// 		asd
		// 		asd
		// 		asdas
		// 		dataas
		// 		dataasdasdasd
		// 		asda
		// 		sdaasd
		// 		asdas
		// 		dataasdasdasd
		// 		asdas
		// 		dataas
		// 		dataasd
		// 		asdd
		// 		asdasd
		// 		a
		// 		sd
		// 		asdasdas
		// 		d
		// 		as
		// 		d
		// 		asdas
		// 		dataasd
		// 		asda
		// 		"></data></aside></address> nha`,
		// },
	]);
	// const {accountId, accessToken} = useAppSelector((state) => state.auth);

	const [message, setMessage] = useState<string>('');
	const [sender, setSender] = useState<string>('AnhMinh'); // Có thể thay đổi thành tên người dùng thực tế

	const accessToken: string | null = useAppSelector((state) =>
		state.auth.account?.accessToken ? state.auth.account?.accessToken : null,
	);
	useEffect(() => {
		const token = async () => {

			console.log('Token:' +accessToken + "|")

			const newSocket = io(`${BE_URL_CHAT}`, {
				transports: ['websocket'],
				extraHeaders: {
					authorization: accessToken ? `${accessToken}` : '',
				},
			});

			setSocket(newSocket);

			const join = () =>
				newSocket.emit('joinRoom', {
					userIdOrder: '0652aabc-69f7-44a2-bfa1-dd51135c1e5a',
					content: 'Helo',
				});
			join();
		};

		if (accessToken) {
			token();
		}
	}, []);

	const handleSendMessage = () => {
		if (socket && message) {
			socket.emit(
				'message',
				{
					userIdOrder: '0652aabc-69f7-44a2-bfa1-dd51135c1e5a',
					content: message,
				},
				(data: any) => {
					console.log(data);
				},
			);
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
							image={item.image ? item.image : ''}
							sender={item.sender}
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
		</View>
	);
};
