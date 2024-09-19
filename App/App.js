import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationRoute from './src/Components/Routes/AuthenticationRoute';
import AuthorizedRoute from './src/Components/Routes/AuthorizedRoute';
import Toast from 'react-native-toast-message';
import AuthenticationContextProvider from './src/context/AuthenticationContext ';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthenticationContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Authorized" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Authorized" component={AuthorizedRoute} />
          <Stack.Screen name="Authentication" component={AuthenticationRoute} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </AuthenticationContextProvider>
  );
};

export default App;











