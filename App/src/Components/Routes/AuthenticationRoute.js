import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Openingpage from '../Pages/Openingpage';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { AuthenticationContext } from '../../context/AuthenticationContext ';

const Stack = createStackNavigator();

const AuthenticationRoute = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
      <Stack.Navigator initialRouteName="Openingpage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Openingpage" component={Openingpage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  );
};

export default AuthenticationRoute;