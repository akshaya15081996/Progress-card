import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { baseUrl } from "../../util";
import Toast from "react-native-toast-message";
const { width, height } = Dimensions.get("window");
import axios from "axios";

const Register = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //To watch the password field to display validation error if passwords doesnot match
  const passwordValue = watch("password");

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}login/register`, data);
      if (response.data) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Registration Successful",
          text2: "You can now log in.",
        });
        navigation.navigate("Login");
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Registration Failed",
          text2:
            response.data.message || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Registration Failed",
        text2:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/img2.jpg")}
            style={styles.image}
          />
          <Svg
            width={width}
            height={height * 0.082}
            viewBox="0 0 392.84 62.82"
            style={styles.wavySvg}
          >
            <Path
              d="m392.84,0v62.82H0V12.22c16.6,26.12,47.6,41.36,80.14,36.31L392.84,0Z"
              fill="#fff"
            />
          </Svg>
        </View>
         <ImageBackground
          source={require("../../../assets/gradient.png")}
          style={styles.background}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>Register</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, errors.email && styles.inputError,{
                  marginBottom: errors.email && errors.email.message.length > 30 ? 40 : 30,
                },]}>
              <Text style={[styles.label,errors.email && styles.labelerror]}>
                Email
              </Text>
              <Controller
                control={control}
                rules={{
                  required: "Please enter Email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={[styles.inputWrapper, {
                  marginBottom: errors.phoneno && errors.phoneno.message.length > 30 ? 40 : 30,
                },errors.phoneno && styles.inputError]}>
              <Text style={[styles.label,errors.phoneno && styles.labelerror]}>
                Mobile Number
              </Text>
              <Controller
                control={control}
                rules={{
                  required: "Please enter mobile number",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Mobile Number must be 10 digits",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                  />
                )}
                name="phoneno"
              />
              {errors.phoneno && (
                <Text style={styles.errorText}>{errors.phoneno.message}</Text>
              )}
            </View>

            <View style={[styles.inputWrapper,{
                  marginBottom: errors.password && errors.password.message.length > 30 ? 40 : 30,
                }, errors.password && styles.inputError]}>
              <Text style={[styles.label,errors.password && styles.labelerror]}>
                Password
              </Text>
              <Controller
                control={control}
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: /^.{8,}$/,
                    message: "Password must be at least 8 characters long",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            <View style={[styles.inputWrapper,{
                  marginBottom: errors.confirmPassword && errors.confirmPassword.message.length > 30 ? 40 : 30,
                }, errors.confirmPassword && styles.inputError]}>
              <Text style={[styles.label,errors.confirmPassword && styles.labelerror]}>
                Confirm Password
              </Text>
              <Controller
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToLogin}
            style={styles.loginLinkContainer}
          >
            <Text style={styles.loginLink}>
              Have an account? <Text style={styles.signinText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: height * 0.5,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "99%",
    resizeMode: "cover",
    backgroundColor: "WHITE",
  },
  wavySvg: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {  
    position: "absolute",
    left:-70,
    top: height * 0.4,
    width: width * 0.6  , 
    height: height * 0.6 , 
    transform: [
      { scaleX: 6
      }, // Flips the image vertically
      { rotate: '50deg' } 
    ],
    resizeMode: "cover"
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 10,
  },
  inputContainer: {
    width: "80%",
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#6A0DAD",
    borderRadius: 10,
    paddingHorizontal: 10,
    position: "relative",
    height: 60,
  },
  label: {
    fontSize: 12,
    color: "#6A0DAD",
    position: "absolute",
    top: 4,
    left: 19,
    fontWeight: "bold",
    backgroundColor: "transparent",
    paddingHorizontal: 2,
  },
  input: {
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    height: 70,
  },
  inputError: {
    borderColor: "red",
  },
   labelerror: {
    color: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    bottom: 10,
  },
  registerButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    width: "70%",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    alignItems: "center",
    bottom:height * 0.01
  },
  loginLink: {
    fontSize: 14,
    color: "#555",
  },
  signinText: {
    color: "#6A0DAD",
    fontWeight: "bold",
  },
});

export default Register;




