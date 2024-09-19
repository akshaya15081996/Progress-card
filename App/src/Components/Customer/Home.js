import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../../context/AuthenticationContext ';
import axios from 'axios';
import { baseUrl } from "../../util";
import BackgroundSVG from '../../../assets/gradient.svg';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const { onLogout } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  
  const [user,setUser]=useState([])

 const navigateToProfile =()=>{
  navigation.navigate("Profile");
 }
  //decode user data from token stored in asyncstorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('isUser');
        if (data) {
          // console.log('Data from AsyncStorage:', JSON.parse(data));
  
          // Pass the token in the body of the request
          let response = await axios.post(
            `${baseUrl}login/tokendecode`, 
            {
              token: JSON.parse(data) // Send token in the request body
            }
          );
          // console.log(response.data, 'response');
          setUser(response.data.verified);
        }
      } catch (error) {
        console.error('Failed to fetch data from AsyncStorage:', error);
      }
    };
  
    fetchData(); 
  }, []);




  return (
    <View style={styles.container}>

     <BackgroundSVG style={styles.svgBackground} />
        <Text style={styles.text}>Welcome to home page {user.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToProfile}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLogout(navigation)} 
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  svgBackground: {
    width: '50%',
    height: '50%',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default Home;



