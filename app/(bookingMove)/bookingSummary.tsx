import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useBookMoveFormContext } from "@/context/BookMoveContext";

const bookingSummary = () => {
  const { formData, setFormData } = useBookMoveFormContext();
  console.log("formData: ", formData);
  return (
    <View>
      <Text>bookingSummary</Text>
    </View>
  );
};

export default bookingSummary;

const styles = StyleSheet.create({});
