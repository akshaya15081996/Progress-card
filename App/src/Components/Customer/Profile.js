import React, { useState, useEffect,useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../util";
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../../context/AuthenticationContext ';
const { width, height } = Dimensions.get("window");

export default function Profile() {
    const { onLogout } = useContext(AuthenticationContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [age, setAge] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const phoneno = watch("phoneno");
  const [storedPhoneno, setStoredPhoneno] = useState("");
  const [customerid, setCustomerid] = useState("");
  const navigation = useNavigation();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("isUser");
        if (data) {
          let response = await axios.post(`${baseUrl}login/tokendecode`, {
            token: JSON.parse(data),
          });
          const customerDetails = response.data.verified?.customerdetails || {};
          setCustomerid(customerDetails._id)
          const phone = customerDetails.phoneno.toString() ||'';
          setStoredPhoneno(phone);
          setValue("phoneno", phone);
          setValue("name", customerDetails.name || "");
          setValue("dateOfBirth",customerDetails.dateOfBirth || "");
          setAge(customerDetails.age.toString());
          setValue("class", customerDetails.class || "");
          setValue("address", customerDetails.address || "");
          setValue("whatsappno", customerDetails.whatsappno ? customerDetails.whatsappno.toString() : "");
        }
      } catch (error) {
        // console.error("Failed to fetch data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);

  const handleDateSelect = (date) => {
    setIsVisible(false);
    setValue("dateOfBirth", format(date, "dd-MM-yyyy"));
    const today = new Date();
    const calculatedAge = today.getFullYear() - date.getFullYear();
    const finalAge =
      today.getMonth() - date.getMonth() >= 0
        ? calculatedAge
        : calculatedAge - 1;
    setValue("age", finalAge.toString());
    setAge(finalAge.toString());
  };

  const handleCheckboxChange = () => {
    setSameAsPhone(!sameAsPhone);
    setValue("whatsappno", !sameAsPhone ? phoneno : "");
  };

  const onSubmit =async (data) => {
    data.id=customerid
    try {
        const response = await axios.post(`${baseUrl}customer/updatecustomer`, data);
        if (response.data) {
          Toast.show({
            type: "success",
            position: "top",
            text1: "Profile Updated Successfully",
            text2:'Please Login again'
          });
          onLogout(navigation);
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Profile Updation Failed",
            text2:
              response.data.message || "An error occurred. Please try again.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Profile Updation Failed",
          text2:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
      }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../../assets/robot.png")} 
        style={styles.robotImage}
      />
      <Image
        source={require("../../../assets/gradient.png")} 
        style={styles.lowergradientImage}
      />
      <Image
        source={require("../../../assets/gradient.png")} 
        style={styles.topgradientImage}
      />
      <Text style={styles.header}>Create Profile</Text>
      <Text style={styles.subheader}>
        Let's get started by getting to know you better.
      </Text>

      <View style={styles.inputContainer}>
      <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
          <Text style={[styles.label,errors.name && styles.labelerror]}>Name</Text>
          <Controller
            control={control}
            rules={{ required: "Please enter your name" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}
        </View>

        <View style={styles.row}>
          <View
            style={[styles.inputWrapper70, errors.dateOfBirth && styles.inputError]}
          >
            <Text style={[styles.label,errors.dateOfBirth && styles.labelerror]}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Controller
                control={control}
                rules={{ required: "Please select your date of birth" }}
                render={({ field: { value } }) => (
                  <TextInput
                    style={[styles.input, { color: value ? "black" : "#888" }]}
                    placeholder="Select your date of birth"
                    placeholderTextColor="#888"
                    value={value}
                    editable={false}
                  />
                )}
                name="dateOfBirth"
              />
            </TouchableOpacity>
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>
            )}
          </View>

          <View style={styles.inputWrapper30}>
            <Text style={[styles.label,errors.age && styles.labelerror]}>Age</Text>
            <TextInput
              style={[styles.input, { color: age ? "black" : "#888" }]}
              placeholder="0"
              placeholderTextColor="#888"
              value={age }
              editable={false}
            />
          </View>
        </View>

        <View style={[styles.inputWrapper, errors.class && styles.inputError]}>
          <Text style={[styles.label,errors.class && styles.labelerror]}>Class/ Course</Text>
          <Controller
            control={control}
            rules={{ required: "Please enter your class/course" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your class/course"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="class"
          />
          {errors.class && (
            <Text style={styles.errorText}>{errors.class.message}</Text>
          )}
        </View>
        <View
          style={[styles.textAreaWrapper, errors.address && styles.inputError]}
        >
          <Text style={[styles.label,errors.address && styles.labelerror]}>Address</Text>
          <Controller
            control={control}
            rules={{ required: "Please enter your address" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textArea}
                placeholder="Enter your address"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
                numberOfLines={4}
              />
            )}
            name="address"
          />
          {errors.address && (
            <Text style={styles.errorTextarea}>{errors.address.message}</Text>
          )}
        </View>

        <View
          style={[styles.inputWrapper, errors.phoneno && styles.inputError]}
        >
          <Text style={styles.label}>Phone Number</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={[styles.input, { color: value ? "black" : "#888" }]}
                placeholder="Enter your phone number"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={storedPhoneno || value}
                keyboardType="numeric"
                editable={false}
              />
            )}
            name="phoneno"
          />
        </View>

        <View style={[styles.inputWrapper, { marginBottom: 0 }, errors.whatsappno && styles.inputError]}>
          <Text style={[styles.label,errors.whatsappno && styles.labelerror]}>WhatsApp Number</Text>
          <Controller
            control={control}
            rules={{
              required: "Please enter your whatsapp number",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Whatsapp number must be 10 digits",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: value ? "black" : "#888" }]}
                placeholder="Enter your whatsapp number"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!sameAsPhone}
                keyboardType="numeric"
              />
            )}
            name="whatsappno"
          />
          {errors.whatsappno && (
            <Text style={styles.errorText}>
              {errors.whatsappno.message}
            </Text>
          )}
          <CheckBox
            title="Same as Phone Number"
            checked={sameAsPhone}
            onPress={handleCheckboxChange}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxLabel}
            checkedColor="black"
            uncheckedColor="black"
          />
        </View> 
        
        <TouchableOpacity
          style={styles.ProfileButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.ProfileButtonText}>Get Started</Text>
        </TouchableOpacity>
        
      </View>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleDateSelect}
        onCancel={() => setIsVisible(false)}
        maximumDate={new Date()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F7F8FB",
    alignItems: "center",
    position: "relative",
  },
  robotImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 250, 
    height: 400, 
    zIndex: -2,
    opacity:0.1
  },
  lowergradientImage: {
    position: "absolute",
    bottom: -300,
    left:-300,
    zIndex: -1,
  },
 topgradientImage: {
    position: "absolute",
    top: -300,
    right:-300,
    zIndex: -1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6A0DAD",
    marginBottom: 5,
    marginTop: height * 0.02,
  },
  subheader: {
    fontSize: 16,
    textAlign: "center",
    color: "#6C6C6C",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
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
  inputWrapper70: {
    width: "78%",
    borderWidth: 1,
    borderColor: "#6A0DAD",
    borderRadius: 10,
    paddingHorizontal: 10,
    position: "relative",
    height: 60,
  },
  inputWrapper30: {
    width: "20%",
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
  labelerror:{
color: "red"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    bottom: 10,
  },
  textAreaWrapper: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#6A0DAD",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 90,
  },
  textArea: {
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 16,
    height: "100%",
    textAlignVertical: "top",
  },
  errorTextarea: {
    color: "red",
    fontSize: 12,
    bottom: -2,
  },
  ProfileButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: height * 0.1,
  },
  ProfileButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginTop: -5,
    marginLeft: -20,
    paddingTop: 0,
  },
  checkboxLabel: {
    fontSize: 12,
    color: "black",
    fontWeight: "normal",
    marginLeft: 5,
  },
});