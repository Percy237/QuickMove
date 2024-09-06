import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const logisticIllustration = require("../../assets/images/logistics-concept-illustration.png");

const step = () => {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Image source={logisticIllustration} style={styles.image} />
      <Text
        style={{
          color: Colors[colorScheme].text,
          marginBottom: 20,
          marginTop: 10,

          fontSize: 16,
        }}
      >
        Ready to take your moving business to the next level? Fill out the form
        below to become a verified mover on our platform. Provide accurate
        details and upload the necessary documents to ensure a smooth onboarding
        process.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={() => router.push("/step1")}
        >
          <Text style={styles.buttonText}>Let's go</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default step;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
