import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack } from './src/libs';
import {HomePage, LoginTest} from './src/components';
import { Tab } from './src/libs/navigation/navigationTab';
import { Brand } from './src/assets';



export default function App() {
  return (
      <NavigationContainer >
        <Tab.Navigator initialRouteName='Login'>
        <Tab.Screen name="HomePage" component={HomePage} options={{ headerLeft: () => <Brand />, tabBarIcon: () => <Brand />}}/>
        <Tab.Screen name="Login" component={LoginTest} />
        </Tab.Navigator>
      </NavigationContainer>

  );
}
