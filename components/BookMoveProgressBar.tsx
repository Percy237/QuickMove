import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { useBookMoveProgressBar } from "@/context/BookMoveProgressBar";
import Colors from "@/constants/Colors";

const BookMoveProgressBar = () => {
  const colorScheme = useColorScheme() || "light";
  const { currentActive, handleNext, handlePrev } = useBookMoveProgressBar();
  const totalSteps = 4;
  return (
    <View>
      <View style={styles.container}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.defaultProgressBar}>
            <View
              style={[
                styles.progress,
                { backgroundColor: Colors[colorScheme].tint },
                {
                  width: `${((currentActive - 1) / (totalSteps - 1)) * 100}%`,
                },
              ]}
            />
          </View>
          {[...Array(totalSteps)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.circle,
                currentActive > index
                  ? styles.activeCircle
                  : styles.inactiveCircle,
              ]}
            >
              <Text style={styles.circleText}>{index + 1}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default BookMoveProgressBar;
const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 30,
    width: "100%",
    height: 30,
    alignItems: "center",
  },
  defaultProgressBar: {
    position: "absolute",
    top: "50%",
    left: 0,
    height: 4,
    backgroundColor: "#e0e0e0", // Default progress color (before step completion)
    width: "100%",
    zIndex: -1,
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: 0,
    height: 4,

    transform: [{ translateY: -2 }],
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  activeCircle: {
    borderColor: "#3498db",
    backgroundColor: "#007BFF",
  },
  inactiveCircle: {
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  circleText: {
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#e0e0e0",
  },
});
