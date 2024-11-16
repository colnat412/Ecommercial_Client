import React, { useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from 'react-native-paper';
import { colors, style } from '@/src/constants';

export const ImageInput = () => {
	const [file, setFile] = useState<any>(null);

	const handleDocumentPick = async () => {
		const result: DocumentPicker.DocumentPickerResult =
			await DocumentPicker.getDocumentAsync({
				type: 'image/*',
				copyToCacheDirectory: true,
			});
		if (result.assets !== null) {
			setFile(result.assets[0]);
		}
		console.log(result);
	};

	return (
		<View style={{ flex: 1, gap: 4 }}>
			<Button
				mode="contained"
				style={{ borderRadius: 8 }}
				buttonColor={colors.brand}
				onPress={handleDocumentPick}
			>
				Add Image
			</Button>
			{file && (
				<View
					style={[
						style.outline,
						{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#F5FCFF',
							padding: 4,
						},
					]}
				>
					<Image
						source={{ uri: file.uri }}
						width={400}
						height={150}
						resizeMode="contain"
					/>
				</View>
			)}
		</View>
	);
};
