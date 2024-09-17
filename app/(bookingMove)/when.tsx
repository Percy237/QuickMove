import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useBookMoveProgressBar } from "@/context/BookMoveProgressBar";
import { useForm } from "react-hook-form";
import BookMoveProgressBar from "@/components/BookMoveProgressBar";
import MapBoxSearchBox from "@/components/MapBoxSearchBox";

const when = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() || "light";
  const { currentActive, handleNext, handlePrev } = useBookMoveProgressBar();
  const { control, handleSubmit, watch } = useForm();

  const onSubmit = () => {
    handleNext();
  };
  return (
    <View style={[{ backgroundColor: Colors[colorScheme].background }]}>
      <BookMoveProgressBar />

      <MapBoxSearchBox />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={() => {
            router.back();
            handlePrev();
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonTextPrimary },
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonTextPrimary },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default when;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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

  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
