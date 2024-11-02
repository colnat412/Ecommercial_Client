import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HomePage from '@/components/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack } from './libs';




export default function App() {
  return (
      <NavigationContainer independent={true} >
        <Stack.Navigator initialRouteName='HomePage'>
          <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}
