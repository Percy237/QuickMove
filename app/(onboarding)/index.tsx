import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
const signInImage = require("../../assets/images/people-carrying-delivering-big-box-delivery-workers-working-warehouse-men-with-goods-carton-packaging-hands-two-guys-with-load.png");

const { width, height } = Dimensions.get("window");

const Index = () => {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme].background,
        paddingTop: 30,
      }}
    >
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        dot={
          <View
            style={[
              styles.dot,
              { backgroundColor: Colors[colorScheme].tabIconDefault },
            ]}
          />
        }
        activeDot={
          <View
            style={[
              styles.activeDot,
              { backgroundColor: Colors[colorScheme].tabIconSelected },
            ]}
          />
        }
      >
        <View
          style={[
            styles.slide,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Image source={signInImage} style={styles.image} />
          <Text
            style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}
          >
            Welcome to MoveIt
          </Text>
          <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
            Your trusted moving service, simplifying your relocation process.
          </Text>
        </View>

        <View
          style={[
            styles.slide,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Image source={signInImage} style={styles.image} />
          <Text
            style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}
          >
            Choose Your Service
          </Text>
          <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
            Whether it’s full service, self service, or specialized, we’ve got
            you covered.
          </Text>
        </View>

        <View
          style={[
            styles.slide,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Image source={signInImage} style={styles.image} />
          <Text
            style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}
          >
            Get Started Today
          </Text>
          <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
            Book your move in just a few easy steps and enjoy a hassle-free
            experience.
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors[colorScheme].buttonPrimary },
            ]}
            onPress={handleGetStarted}
          >
            <Text
              style={[
                styles.buttonText,
                { color: Colors[colorScheme].buttonTextPrimary },
              ]}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: "#000",
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
