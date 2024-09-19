import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationRoute from './AuthenticationRoute';
import { AuthenticationContext } from '../../context/AuthenticationContext ';
import Home from '../Customer/Home';
import Profile from '../Customer/Profile';

const Stack = createStackNavigator();

const AuthorizedRoute = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          
          </>

        ) : (  
          <Stack.Screen name="Authentication" component={AuthenticationRoute} />
        )}
      </Stack.Navigator>
  );
};

export default AuthorizedRoute;