import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import BookMoveProgressBar from "@/components/BookMoveProgressBar";
import { useBookMoveProgressBar } from "@/context/BookMoveProgressBar";
import Colors from "@/constants/Colors";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";

const step1 = () => {
  const router = useRouter();
  const { currentActive, handleNext, handlePrev } = useBookMoveProgressBar();
  const colorScheme = useColorScheme() || "light";
  const [currentHouse, setCurrentHouse] = useState("");
  const [hasElevator, setHasElevator] = useState(false);
  const { control, handleSubmit, watch } = useForm();

  const watchCurrentHouse = watch("currentHouse");
  const watchCurrentLocation = watch("floorNumber");
  const watchDestinationLocation = watch("destinationLocation");

  const onSubmit = () => {
    handleNext();
    router.push("/when");
  };

  return (
    <View style={{ backgroundColor: Colors[colorScheme].background }}>
      <BookMoveProgressBar />
      <Text
        style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}
      ></Text>
      <Text>Your current house is</Text>
      <Controller
        control={control}
        name="currentHouse"
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            style={{ color: Colors[colorScheme].text }}
            selectedValue={value}
            onValueChange={(itemValue) => {
              onChange(itemValue);
              setCurrentHouse(itemValue);
            }}
          >
            <Picker.Item label="A villa" value="villa" />
            <Picker.Item label="A duplex" value="duplex" />
            <Picker.Item label="A triplex" value="triplex" />
            <Picker.Item label="An apartment" value="apartment" />
            <Picker.Item label="A studio" value="studio" />
            <Picker.Item label="A room" value="room" />
            <Picker.Item label="A store" value="store" />
            <Picker.Item label="One or more offices" value="offices" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        )}
      />
      {["villa", "duplex", "triplex", "apartment", "studio", "room"].includes(
        watchCurrentHouse
      ) && (
        <>
          <Text>Number of rooms (excluding bathrooms)</Text>
          <Controller
            control={control}
            name="nbRooms"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                placeholder="Enter the number of rooms"
              />
            )}
          />
        </>
      )}
      <Text>It is located</Text>
      <Controller
        control={control}
        name="currentLocation"
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="On the floor" value="floor" />
            <Picker.Item label="On the ground floor" value="groundFloor" />
            <Picker.Item label="In the basement" value="basement" />
          </Picker>
        )}
      />
      {["floor"].includes(watchCurrentHouse) && (
        <>
          <Text>Floor number*</Text>
          <Controller
            control={control}
            name="floorNumber"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                placeholder="Enter the floor number"
              />
            )}
          />
        </>
      )}
      <View style={styles.buttonContainer}>
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

export default step1;

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
