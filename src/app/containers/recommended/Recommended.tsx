import { View } from 'react-native';
import data from '@/dbTest.json';
import { Text } from 'react-native-paper';
import { style } from '@/src/constants';
import { RecommendedItem } from './RecommendedItem';

export const Recommended = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
			}}
		>
			<Text style={[style.headerText, { fontSize: 16, padding: 12 }]}>
				Recommended for you
			</Text>

			<View
				style={{
					justifyContent: 'space-around',
					flexWrap: 'wrap',
					flexDirection: 'row',
					gap: 13,
				}}
			>
				{data.products.map((value, index) => (
					<RecommendedItem key={index} product={value} />
				))}
			</View>
		</View>
	);
};
