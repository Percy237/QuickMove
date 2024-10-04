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
import React, { useEffect, useState } from "react";
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
  useEffect(() => {});
  const router = useRouter();

  const colorScheme = useColorScheme() || "light";

  const handleBecomeMover = () => {
    router.push("/(becomeMover)/step");
  };

  const {
    data: moverDetails,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mover-profile", user?.user?._id],
    queryFn: () => getMoverProfile(user?.user?._id as string),
    enabled: !!user?.user?._id,
  });

  console.log(moverDetails);

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
      {isLoading ? (
        <Text>Company details loading...</Text>
      ) : (
        <View style={{ marginTop: 20 }}>
          <Text>Company information</Text>

          <View
            style={{ backgroundColor: "#0101", padding: 5, borderRadius: 10 }}
          >
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Company Name:</Text>
              <Text>{moverDetails?.businessName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Business Address:</Text>
              <Text>{moverDetails?.businessAddress}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Description:</Text>
              <Text>{moverDetails?.description}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Service Area:</Text>
              <Text>{moverDetails?.serviceArea}</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Company Logo:</Text>
              <View
                style={{
                  width: 300,
                  height: 200,
                }}
              >
                {moverDetails?.companyLogo && (
                  <Image
                    source={{ uri: moverDetails.companyLogo }}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  />
                )}
              </View>
            </View>
            <View style={[styles.infoRow, { marginTop: 30 }]}>
              <Text style={styles.infoLabel}>Average Rating:</Text>
              <Text>{moverDetails?.averageRating}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ratings Count:</Text>
              <Text>{moverDetails?.ratingsCount}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Insurance Document:</Text>
              <Text>
                {moverDetails?.insuranceDocument && <Text>Available</Text>}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Business Registration Document:
              </Text>
              <Text>
                {moverDetails?.businessRegistrationDocument && (
                  <Text>Available</Text>
                )}
              </Text>
            </View>
          </View>
        </View>
      )}
      <Link href={"/(mover)/profile/pricing"} asChild>
        <Pressable style={styles.infoRow}>
          <Text style={styles.infoLabel}>Pricing</Text>
          <Text>
            <Icon name="arrow-right" size={20} color="#000" />
          </Text>
        </Pressable>
      </Link>

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

// 5.347314;

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
