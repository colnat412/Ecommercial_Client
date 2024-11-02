import { NavigationContainer } from '@react-navigation/native';
import { store, Tab } from './src/libs';
import { HomePage, LoginTest } from './src/components';
import { Brand } from './src/assets';
import { Provider } from 'react-redux';




export default function App() {
  return (
    // <Provider store={store}>
      <NavigationContainer >
        <Tab.Navigator initialRouteName='HomePage'>
          <Tab.Screen name="HomePage" component={HomePage} options={{ headerLeft: () => <Brand />, tabBarIcon: () => <Brand /> }} />
          <Tab.Screen name="Login" component={LoginTest} />
        </Tab.Navigator>
      </NavigationContainer>
    // </Provider>
  );
}
