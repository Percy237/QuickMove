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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBookMoveFormContext } from "@/context/BookMoveContext";

const Step1 = () => {
  const router = useRouter();
  const { currentActive, handleNext } = useBookMoveProgressBar();
  const colorScheme = useColorScheme() || "light";
  const { formData, setFormData } = useBookMoveFormContext();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { moverId } = useLocalSearchParams();

  const watchCurrentHouse = watch("currentHouse");
  const watchCurrentHouseLocation = watch("currentHouseLocation");
  const watchDestinationHouseLocation = watch("destinationHouseLocation");

  const onSubmit = (data: any) => {
    setFormData({ moverId, ...data });
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
        <Text>Your current house is</Text>
        <Controller
          control={control}
          rules={{
            required: "This field is required",
          }}
          name="currentHouse"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={{
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
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

        {["villa", "duplex", "triplex", "apartment", "studio"].includes(
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
              render={({ field: { onChange, value } }) => (
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

        <Text>Your current house is located</Text>
        <Controller
          control={control}
          name="currentHouseLocation"
          rules={{
            required: "Please select where your current house is located.",
          }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              }}
            >
              <Picker.Item label="Choose" value="" />
              <Picker.Item label="On the floor" value="floor" />
              <Picker.Item label="On the ground floor" value="groundFloor" />
              <Picker.Item label="In the basement" value="basement" />
            </Picker>
          )}
        />
        {errors.currentHouseLocation && (
          <Text style={styles.errorText}>
            {errors.currentHouseLocation.message}
          </Text>
        )}

        {/* Only show the floor number input if the user selects "On the floor" */}
        {watchCurrentHouseLocation === "floor" && (
          <>
            <Text>Floor number*</Text>
            <Controller
              control={control}
              name="currentHouseFloorNumber"
              rules={{
                required: "Please enter the floor number.",
              }}
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
            {errors.currentHouseFloorNumber && (
              <Text style={styles.errorText}>
                {errors.currentHouseFloorNumber.message}
              </Text>
            )}
          </>
        )}

        <Text>Your destination house is located</Text>
        <Controller
          control={control}
          name="destinationHouseLocation"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              }}
            >
              <Picker.Item label="Choose" value="" />
              <Picker.Item label="On the floor" value="floor" />
              <Picker.Item label="On the ground floor" value="groundFloor" />
              <Picker.Item label="In the basement" value="basement" />
            </Picker>
          )}
        />
        {/* Only show the floor number input if the destination house is on a floor */}
        {watchDestinationHouseLocation === "floor" && (
          <>
            <Text>Floor number*</Text>
            <Controller
              control={control}
              name="destinationHouseFloorNumber"
              rules={{
                required: "Please enter the floor number.",
              }}
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
            {errors.destinationHouseFloorNumber && (
              <Text style={styles.errorText}>
                {errors.destinationHouseFloorNumber.message}
              </Text>
            )}
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

export default Step1;

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
