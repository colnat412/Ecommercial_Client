import { Brand, fonts } from './src/assets';
import { Provider } from 'react-redux';
import { Provider as PaperProviderT, PaperProvider } from 'react-native-paper';
import { theme } from './src/constants/theme';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { Loading, StackScreenApp } from './src/app';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/constants';

export default function App() {
	const [fontsLoaded] = useFonts(fonts);

	if (!fontsLoaded) {
		return <Loading size={300} />;
	} else {
		return (
			// <Provider store={store}>

			<PaperProvider theme={theme}>
				<View style={{ backgroundColor: colors.mainBackground, flex: 1 }}>
					<PaperProviderT>
						<StackScreenApp />
					</PaperProviderT>
				</View>
			</PaperProvider>
			// </Provider>
		);
	}
}
