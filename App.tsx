import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import Alterar from './app/screens/Alterar';
import Lista from './app/screens/Lista';
import Cadastro from './app/screens/Cadastro';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
     <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen name="Cadastrar" component={Cadastro}/>
        <Stack.Screen name="Lista" component={Lista}/>
        <Stack.Screen name="Alterar" component={Alterar}/>
       </Stack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
