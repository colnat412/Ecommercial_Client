import { fonts } from './src/assets';

import { Provider as PaperProviderT, PaperProvider } from 'react-native-paper';
import { theme } from './src/constants/theme';
import { View } from 'react-native';

import { colors } from './src/constants';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/libs';
import { Loading, StackScreenApp } from './src/app';

import { useFonts } from 'expo-font';

export default function App() {
	const [fontsLoaded] = useFonts(fonts);

	if (!fontsLoaded) {
		return <Loading size={300} />;
	} else {
	}
	return (
		<ReduxProvider store={store}>
			<View style={{ backgroundColor: colors.mainBackground, flex: 1 }}>
				<PaperProvider theme={theme}>
					<PaperProviderT>
						<StackScreenApp />
					</PaperProviderT>
				</PaperProvider>
			</View>
		</ReduxProvider>
	);
}
