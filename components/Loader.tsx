import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoaderKit from "react-native-loader-kit";

const Loader = () => {
  return (
    <LoaderKit
      style={{ width: 50, height: 50 }}
      name={"BallPulse"}
      color={"red"}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
