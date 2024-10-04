import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import Colors from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { useColorScheme } from "react-native";
import { getMoverProfile, logout } from "@/api-client";
import { useAuthContext } from "@/context/AuthProvider";
import { Link, useRouter } from "expo-router";
import { UserType } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

const index = () => {
  const { user } = useAuthContext();

  const router = useRouter();

  const colorScheme = useColorScheme() || "light";

  const handleBecomeMover = () => {
    router.push("/(becomeMover)/step");
  };

  const userId = user?.user?._id;

  const {
    data: moverDetails,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mover-profile", userId],
    queryFn: () => getMoverProfile(userId as string),
    enabled: !!userId,
  });

  const handleLogout = () => {
    () => logout;
    router.push("/(onboarding)");
  };
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <View>
        <Text>Personal Information</Text>
        <View
          style={{ backgroundColor: "#0101", padding: 5, borderRadius: 10 }}
        >
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>First Name:</Text>
            <Text>{user?.user?.firstName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Name:</Text>
            <Text>{user?.user?.lastName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text>{user?.user?.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Number:</Text>
            <Text>{user?.user?.phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text>{user?.user?.address}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: Colors[colorScheme].buttonPrimary },
        ]}
        onPress={() => handleBecomeMover()}
      >
        <Text style={styles.logoutButtonText}>Become a logistic provider</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: Colors[colorScheme].buttonPrimary },
        ]}
        onPress={() => handleLogout()}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000", //
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
