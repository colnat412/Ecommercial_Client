import { NavigationContainer } from '@react-navigation/native';
import { Tab } from './src/libs';
import { HomePage, Login } from './src/components';
import { Brand, fonts } from './src/assets';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/constants/theme';
import { useFonts } from 'expo-font';
import { View } from 'react-native';



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
        <NavigationContainer >
          <Tab.Navigator initialRouteName='Login'>
            <Tab.Screen name="HomePage" component={HomePage} options={{ headerLeft: () => <Brand />, tabBarIcon: () => <Brand />, headerShown: false }} />
            <Tab.Screen name="Login" component={Login} options={{tabBarStyle: {display: "none"}, headerShown: false}}/>
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
      // </Provider>
    );
  }


}
