import { FlatList, View } from 'react-native';
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
			<View style={{ width: "100%",justifyContent: "center", alignItems: "center"}}>
				<FlatList
					style={{ backgroundColor: "red" }}
					numColumns={2}
					data={data.products}
					renderItem={({ item }) => <RecommendedItem product={item} />}
				/>
			</View>
		</View>
	);
};
