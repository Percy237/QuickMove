import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MoverRegistrationSuccess = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Submitted</Text>
      <Text style={styles.message}>
        Thank you for registering! We will review your details and notify you
        once your account is verified.
      </Text>
    </View>
  );
};

export default MoverRegistrationSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
});
