import { FlatList, View } from 'react-native';
import data from '@/dbTest.json';
import { Text } from 'react-native-paper';
import { style } from '@/src/constants';
import { ProductItemVertical } from '../../components';

interface RecommendedProps {
	title: string;
}

export const Recommended = ({ title }: RecommendedProps) => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
			}}
		>
			<Text style={[style.headerText, { fontSize: 16, padding: 12 }]}>
				{title}
			</Text>
			<View
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<FlatList
					numColumns={2}
					data={data.products}
					renderItem={({ item }) => <ProductItemVertical product={item} />}
				/>
			</View>
		</View>
	);
};
