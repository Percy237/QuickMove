import Colors from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import * as Progress from "react-native-progress";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export default function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const progress = step / totalSteps;
  const colorScheme = useColorScheme() || "light";

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
        Step {step} of {totalSteps}
      </Text>
      <Progress.Bar
        progress={progress}
        width={null}
        color="#007bff"
        borderRadius={8}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});
