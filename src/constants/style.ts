import { StyleSheet } from 'react-native';
import { colors } from './color';

/**
 * headerContainer: headderContainer + body
 * just Body: container
 */

export const style = StyleSheet.create({
	headerContainer: {
		paddingTop: 40,
		paddingHorizontal: 8,
		paddingVertical: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		minHeight: 80,
		borderBottomWidth: 1,
		borderBottomColor: colors.outline,

	},
	container: {
		flex: 1,
		backgroundColor: colors.mainBackground,
		marginTop: 32,
		paddingHorizontal: 16,
		justifyContent: 'flex-start',
	},
	body: {
		flex: 1,
		backgroundColor: colors.mainBackground,
	},
	contentBody: {
		flex: 1,
		backgroundColor: colors.mainBackground,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	rowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	rowCenterBetween: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	rowCenterCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	columnCenter: {
		flexDirection: 'column',
		alignItems: 'center',
		gap: 8,
		width: '100%',
	},
	centerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		width: '100%',
	},
	button: {
		backgroundColor: colors.brand,
		borderRadius: 8,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		width: '100%',
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'RobotoBold',
	},
	titleText: {
		fontSize: 12,
		color: colors.secondText,
	},
	priceText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.brand,
	},
	outline: {
		borderColor: colors.outline,
		borderWidth: 2,
		borderRadius: 8,
	},
});
