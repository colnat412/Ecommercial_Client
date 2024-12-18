import { colors } from '@/src/constants';
import { StackScreenNavigationProp } from '@/src/libs';
import { Category } from '@/src/types/category';
import { useNavigation } from '@react-navigation/native';
import {
	Image,
	Pressable,
	StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';

interface CategoryItemProps {
	category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
	const navigation = useNavigation<StackScreenNavigationProp>();
	const handleNavigation = () => {
		navigation.navigate('SubCategory', {categoryId: category.id});
	};
	return (
		<Pressable onPress={handleNavigation} style={styles.container}>
			<Image style={styles.circularImage} source={{ uri: category.image }} />
			<Text numberOfLines={1} style={styles.textStyle}>
				{category.title}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 6,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: 8,
	},
	circularImage: {
		width: 80,
		height: 80,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: colors.brand
	},
	textStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		minWidth: 100,
		maxWidth: 100
	},
});
