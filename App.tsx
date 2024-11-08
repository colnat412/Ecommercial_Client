import { Brand, fonts } from './src/assets';
import { Provider } from 'react-redux';
import { Provider as PaperProviderT, PaperProvider } from 'react-native-paper';
import { theme } from './src/constants/theme';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { StackScreenApp } from './src/app';





export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <Brand width={300} height={300} />
      </View>
    )
  }
  else {
    return (

      // <Provider store={store}>

        <PaperProvider theme={theme}>
          <PaperProviderT>
            <StackScreenApp />
          </PaperProviderT>
        </PaperProvider>
      // </Provider>
    );
  }


}
