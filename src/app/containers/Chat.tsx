// src/Chat.tsx
import { BE_URL } from '@/env';
import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { ChatComponent, DismissKeyboardView } from '../components';
import { colors, style } from '@/src/constants';
import { Button, Text, TextInput } from 'react-native-paper';
import { Send } from '@/src/assets';
import { HeaderTitle } from '../navigation/components';

interface Message {
	sender: 'sending' | 'receiving';
	message: string;
	image?: string;
}

export const Chat: React.FC = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<Message[]>([
		{
			sender: 'sending',
			message: 'Iphone 5 nhiêu anh',
			image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',
		},
		{
			sender: 'sending',
			message: 'bền hông anh ?',
			image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',
		},
		{
			sender: 'receiving',
			image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',

			message: 'Ok em',
		},
		{
			sender: 'receiving',
			image: 'https://i.pinimg.com/736x/fe/74/b5/fe74b5dc3f45877bc653fea0c228650b.jpg',

			message: `xịnsa;dlk;laskdl;saas;dk
				<address>asd
				asd
				asd
				a
				sd
				<aside><data value="asdas
				dataas
				dataasd
				a
				sendMessaged
				as
				dataasdasd
				
				asdd
				asda
				sda
				sdas
				d
				asdd
				asd
				asd
				asd
				asdas
				dataas
				dataasdasdasd
				
				asda
				sdaasd
				
				asdas
				dataasdasdasd
				asdas
				dataas
				dataasd
				asdd
				asdasd
				a
				sd
				asdasdas
				d
				as
				d
				asdas
				dataasd
				asda
				"></data></aside></address> nha`,
		},
	]);
	const [message, setMessage] = useState<string>('');
	const [sender, setSender] = useState<string>(''); // Có thể thay đổi thành tên người dùng thực tế
	const [room, setRoom] = useState<string>('default-room');
	useEffect(() => {
		const newSocket = io(`http://192.168.100.126:6996`, {
			transports: ['websocket'],
		}); // Địa chỉ server NestJS
		setSocket(newSocket);

		newSocket.on('connect', () => {
			console.log('Connected to WebSocket server!');
		});

		newSocket.on('disconnect', () => {
			console.log('Disconnected from WebSocket server!');
		});

		console.log('Connected to server');

		newSocket.on('message', (message: Message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		newSocket.emit(
			'joinRoom',
			{ userIdOrder: '123', room },
			(response: any) => {
				console.log(response);
			},
		);

		// Tham gia room
		newSocket.emit(
			'joinRoom',
			{ userIdOrder: '123', room },
			(response: any) => {
				console.log(response);
			},
		);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const handleSendMessage = () => {
		if (socket && message) {
			const newMessage = { sender, message };
			socket.emit('sendMessage', newMessage);
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
					/>
					<View
						style={{
							backgroundColor: colors.brand,
							borderRadius: 4,
							padding: 8,
						}}
					>
						<Send color={colors.background} />
					</View>
				</View>
			</View>
		</View>
	);
};
