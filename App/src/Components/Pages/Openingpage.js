import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";
import Svg, { Path } from "react-native-svg";
const { width, height } = Dimensions.get("window");

const Openingpage = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleDotPress = (index) => {
    // console.log(`Dot Pressed: ${index}`);
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - activeIndex);
    }
  };

  const handleIndexChanged = (index) => {
    // console.log(`Swiper Index Changed: ${index}`);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        autoplay={false}
        index={activeIndex} // This should be synchronized with the state
        onIndexChanged={handleIndexChanged}
        paginationStyle={styles.pagination}
        renderPagination={(index, total, context) => (
          <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleDotPress(i)}
                style={[
                  styles.dotStyle,
                  activeIndex === i ? styles.activeDotStyle : {},
                ]}
              />
            ))}
          </View>
        )}
      >
        {/* Slide 1 */}
        <View style={styles.slide}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/img1.jpeg")}
              style={styles.image}
            />
            <Svg
              width={width}
              height={height * 0.09}
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
            <View style={styles.content}>
              <Text style={styles.title}>
                Welcome to <Text style={{ fontWeight: "bold" }}>Micky</Text>
              </Text>
              <Text style={styles.description}>
                Micky is here to guide you on your learning journey. Let's get
                started by getting to know you better.
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleNextSlide}>
                <Text style={styles.buttonTextLeft}>Next</Text>
                <Text style={styles.buttonTextRight}>➡</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.skip}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.skipText}>skip</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/img2.jpg")}
              style={styles.image}
            />
            <Svg
              width={width}
              height={height * 0.09}
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
            <View style={styles.content}>
              <Text style={styles.title}>Meet Micky</Text>
              <Text style={styles.description}>
                Hello! I'm Micky, your friendly robot assistant. I'm here to
                help you navigate through the app.
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleNextSlide}>
                <Text style={styles.buttonTextLeft}>Next</Text>
                <Text style={styles.buttonTextRight}>➡</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skip}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.skipText}>skip</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/img3.jpg")}
              style={styles.image}
            />
            <Svg
              width={width}
              height={height * 0.09}
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
            <View style={styles.content}>
              <Text style={styles.title}>Get Started</Text>
              <Text style={styles.description}>
                Ready to dive in? Follow my lead and let’s get started on a
                fantastic journey through the Micky app.
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.buttonTextLeft}>Get Started</Text>
                <Text style={styles.buttonTextRight}>➡</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.skiptransparent}
                onPress={() => console.log("click")}
                disabled
              >
                <Text style={styles.skipTexttransparent}>skip</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
    height: "97%",
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
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
  },
  backgroundImage: {
    position: "absolute",
    left: -70,
    top: height * 0.35,
    width: width * 0.5, // Keep the width as required
    height: height * 0.5, // Control the height to prevent it from spreading too much upwards
    transform: [
      { scaleX: 7 }, // Flips the image vertically
      { rotate: "60deg" },
    ],
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  title: {
    fontSize: 34,
    color: "black",
    textAlign: "center",
    marginHorizontal: 10,
    paddingHorizontal: 0,
  },
  description: {
    fontSize: 17,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
    paddingHorizontal: 30,
    paddingTop: 20,
    minHeight: height * 0.15,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: width * 0.6,
    height: height * 0.08,
    borderColor: "#D3D3D3",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.15,
    marginBottom: height * 0.01,
    bottom: height * 0.03,
  },
  buttonTextLeft: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  buttonTextRight: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  skip: {
    backgroundColor: "#ffe6ee",
    borderRadius: 10,
    width: width * 0.2,
    height: height * 0.03, 
    marginLeft: width * 0.7,
    marginHorizontal: width * 0.06, 
  },
  skipText: {
    fontSize: 14,
    color: "purple",
    textAlign: "center",
  },
  skiptransparent: {
    backgroundColor: "transparent",
    borderRadius: 10,
    width: width * 0.2,
    height: height * 0.03,
    marginLeft: width * 0.7,
    marginHorizontal: width * 0.06,
  },
  skipTexttransparent: {
    fontSize: 14,
    color: "transparent",
    textAlign: "center",
  },
  buttonTextstart: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: height * 0.22, // Fine-tune this value as needed
    width: "100%",
  },
  dotStyle: {
    backgroundColor: "lightgray",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  activeDotStyle: {
    backgroundColor: "purple",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "plum",
  },
});

export default Openingpage;
