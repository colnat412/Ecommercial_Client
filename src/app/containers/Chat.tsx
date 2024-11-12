// src/Chat.tsx
import { BE_URL } from '@/env';
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	StyleSheet,
} from 'react-native';
import { io, Socket } from 'socket.io-client';

interface Message {
	sender: string;
	message: string;
}

const Chat: React.FC = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState<string>('');
	const [sender, setSender] = useState<string>(""); // Có thể thay đổi thành tên người dùng thực tế

	useEffect(() => {
		const newSocket = io(BE_URL); // Địa chỉ server NestJS
		setSocket(newSocket);

		newSocket.on('newMessage', (data: Message) => {
			setMessages((prevMessages) => [...prevMessages, data]);
		});

		newSocket.emit('getMessages', null, (history: Message[]) => {
			setMessages(history);
		});

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
		<View style={styles.container}>
			<FlatList
				data={messages}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.messageContainer}>
						<Text style={styles.sender}>{item.sender}: </Text>
						<Text>{item.message}</Text>
					</View>
				)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Nhập tin nhắn..."
				value={message}
				onChangeText={setMessage}
			/>
			<TextInput
				style={styles.input}
				placeholder="user."
				value={sender}
				onChangeText={setSender}
			/>
			<Button title="Gửi" onPress={handleSendMessage} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	messageContainer: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	sender: {
		fontWeight: 'bold',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginVertical: 10,
		borderRadius: 5,
	},
});

export default Chat;
