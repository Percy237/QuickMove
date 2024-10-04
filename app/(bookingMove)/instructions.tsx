import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Colors from "@/constants/Colors";
import BookMoveProgressBar from "@/components/BookMoveProgressBar";
import { useBookMoveProgressBar } from "@/context/BookMoveProgressBar";
import { useRouter } from "expo-router";
import { useBookMoveFormContext } from "@/context/BookMoveContext";

const instructions = () => {
  const colorScheme = useColorScheme() || "light";
  const { handleNext, handlePrev } = useBookMoveProgressBar();
  const { formData, setFormData } = useBookMoveFormContext();
  const [inventory, setInventory] = useState([
    { id: Date.now(), itemName: "", quantity: 1, isFragile: false },
  ]);

  const addInventoryItem = () => {
    setInventory([
      ...inventory,
      { id: Date.now(), itemName: "", quantity: 1, isFragile: false },
    ]);
  };

  const removeInventoryItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };
  
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({});

  const onSubmit = (data: any) => {
    console.log(data);
    setFormData(data);
    router.push("/bookingSummary");
  };

  return (
    <View style={styles.container}>
      <BookMoveProgressBar />
      <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
        Special Instructions
      </Text>
      <Controller
        control={control}
        name="specialInstructions"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                borderBottomWidth: 1,
                marginBottom: 20,
                height: 100, // Set a height for the text area
                textAlignVertical: "top", // Align text to the top of the text area
                color: Colors[colorScheme].text,
                backgroundColor: Colors[colorScheme].background,
                borderColor: Colors[colorScheme].border,
              },
            ]}
            placeholder="Special Instructions"
            onChangeText={onChange}
            value={value}
            multiline={true} // Allows the TextInput to behave as a text area
          />
        )}
      />
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

export default instructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
