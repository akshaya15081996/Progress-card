import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { baseUrl } from '../util'; 

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
 
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const info = await AsyncStorage.getItem('isUser');
      // console.log(info,'info')
      if (info) {
        setUser(true);
        // console.log(info,'user');
        
      }
    } catch (error) {
      console.error('Failed to retrieve user status:', error);
    }
  };
  const onLogin = async (data, navigation) => {
    
    try {
      let param = {
        email: data.email,
        password: data.password,
      };
  
      let response = await axios.post(`${baseUrl}login/login`, param);
      console.log(response.data, 'response');
  
      if (response.status === 200) { 
        await AsyncStorage.setItem('isUser', JSON.stringify(response.data.token));
        
        setUser(true);
        Toast.show({
          type: 'success',
          text1: 'Logged In',
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => {
            navigation.navigate('Home');
          },
        });
      }
    } catch (err) {
      console.log(err.response.data.message);
      
      // Displaying error toast based on the message from the server
      if (err.response && err.response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'No such User exists. Please check your email.',
        });
      } else if (err.response && err.response.status === 400) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid Password. Please try again.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  const onLogout = async (navigation) => {
    try {
      await AsyncStorage.clear();
      setUser(false);
      navigation.navigate('Openingpage');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: user,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;