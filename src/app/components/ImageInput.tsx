import React, { useState } from 'react';
import { View, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from 'react-native-paper';
import { colors, style } from '@/src/constants';
import { FileDetails } from '@/src/types/others';

interface ImageInputProps {
	onPress: () => void;
	value?: FileDetails | null;
}

export const ImageInput = ({onPress, value}: ImageInputProps) => {
	return (
		<View style={{ flex: 1, gap: 4 }}>
			<Button
				mode="contained"
				style={{ borderRadius: 8 }}
				buttonColor={colors.brand}
				onPress={onPress}
			>
				Add Image
			</Button>
			{value && (
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
						source={{ uri: value.uri }}
						width={400}
						height={150}
						resizeMode="contain"
					/>
				</View>
			)}
		</View>
	);
};
