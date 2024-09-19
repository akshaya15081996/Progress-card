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
import React, { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "../../context/AuthenticationContext ";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const { onLogin } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async (data) => {
    await onLogin(data, navigation);
    reset();
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
            <Text style={styles.title}>Login</Text>
            <Text style={styles.description}>
              You have the power to learn anything, anytime
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <View
              style={[
                styles.inputWrapper,
                {
                  marginBottom: errors.email && errors.email.message.length > 30 ? 40 : 30,
                }, errors.email && styles.inputError
              ]}
            >
              <Text style={[styles.label,errors.email && styles.labelerror]}>
                Email 
              </Text>
              <Controller
                control={control}
                name="email"
                rules={{ required: "Please enter your email" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.email ? styles.inputError : null,
                    ]}
                    placeholder="Enter your email"
                    placeholderTextColor="#888"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View
              style={[
                styles.inputWrapper,
                {
                  marginBottom: errors.password && errors.password.message.length > 30 ? 40 : 30,
                }, errors.password && styles.inputError
              ]}
            >
              <Text style={[styles.label,errors.password && styles.labelerror]}>
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                rules={{ required: "Please enter your Password" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      errors.password ? styles.inputError : null,
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(handleLogin)}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={navigateToRegister}
            style={styles.registerLinkContainer}
          >
            <Text style={styles.registerLink}>
              Don't have an account?{" "}
              <Text style={styles.signUpText}>Sign Up</Text>
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
    backgroundColor: 'white',
  },
  image: {
    width: "100%",
    height: "97%",
    resizeMode: "cover",
    backgroundColor: "white",
  },
  wavySvg: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  backgroundImage: {
    position: "absolute",
    left:-80,
    top: height * 0.35,
    width: width * 0.5, // Keep the width as required
    height: height * 0.5, // Control the height to prevent it from spreading too much upwards
    transform: [
      { 
        scaleX: 7
      }, 
      { rotate: '60deg' } 
    ],
    resizeMode: "cover"
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
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
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    width: "70%",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLinkContainer: {
    alignItems: "center",
    bottom: height * 0.01,
  },
  registerLink: {
    fontSize: 14,
    color: "#555",
  },
  signUpText: {
    color: "#6A0DAD",
    fontWeight: "bold",
  },
});

export default Login;
