import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import BookMoveProgressBar from "@/components/BookMoveProgressBar";
import { useBookMoveProgressBar } from "@/context/BookMoveProgressBar";
import Colors from "@/constants/Colors";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "expo-router";
import { useBookMoveFormContext } from "@/context/BookMoveContext";

const step1 = () => {
  const router = useRouter();
  const { currentActive, handleNext, handlePrev } = useBookMoveProgressBar();
  const colorScheme = useColorScheme() || "light";
  const [currentHouse, setCurrentHouse] = useState("");
  const [currentHouseLocation, setCurrentHouseLocation] = useState("");
  const [destinationHouseLocation, setDestinationHouseLocation] = useState("");
  const [hasElevator, setHasElevator] = useState(false);
  const { formData, setFormData } = useBookMoveFormContext();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchCurrentHouse = watch("currentHouse");
  const watchCurrentHouseLocation = watch("currentHouseLocation");
  const watchDestinationHouseLocation = watch("destinationHouseLocation");
  const watchDestinationLocation = watch("destinationLocation");

  const onSubmit = (data: any) => {
    setFormData(data);
    handleNext();
    router.push("/where");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <BookMoveProgressBar />
      <ScrollView>
        <Text
          style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}
        ></Text>
        <Text>Your current house is</Text>
        <Controller
          control={control}
          rules={{
            required: "This field is required",
          }}
          name="currentHouse"
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={{
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              }}
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setCurrentHouse(itemValue);
              }}
            >
              <Picker.Item label="Choose" value="" />
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
        {errors.currentHouse && (
          <Text style={styles.errorText}>{errors.currentHouse.message}</Text>
        )}

        {["villa", "duplex", "triplex", "apartment", "studio", "room"].includes(
          watchCurrentHouse
        ) && (
          <>
            <Text>Number of rooms (excluding bathrooms)</Text>
            <Controller
              control={control}
              name="nbRooms"
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter the number of rooms"
                />
              )}
            />
            {errors.nbRooms && (
              <Text style={styles.errorText}>{errors.nbRooms.message}</Text>
            )}
          </>
        )}

        <Text>It is located</Text>
        <Controller
          control={control}
          name="currentHouseLocation"
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Choose" value="floor" />
              <Picker.Item label="On the floor" value="floor" />
              <Picker.Item label="On the ground floor" value="groundFloor" />
              <Picker.Item label="In the basement" value="basement" />
            </Picker>
          )}
        />
        {["floor"].includes(watchCurrentHouseLocation) && (
          <>
            <Text>Floor number*</Text>
            <Controller
              control={control}
              name="currentHouseFloorNumber"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter the floor number"
                />
              )}
            />
          </>
        )}
        <Text>Your destination house is located</Text>
        <Controller
          control={control}
          name="destinationHouseLocation"
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Choose" value="floor" />
              <Picker.Item label="On the floor" value="floor" />
              <Picker.Item label="On the ground floor" value="groundFloor" />
              <Picker.Item label="In the basement" value="basement" />
            </Picker>
          )}
        />
        {["floor"].includes(watchDestinationHouseLocation) && (
          <>
            <Text>Floor number*</Text>
            <Controller
              control={control}
              name="destinationHouseFloorNumber"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
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
      </ScrollView>
    </View>
  );
};

export default step1;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
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
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
