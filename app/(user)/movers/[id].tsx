import {
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { movers } from "@/assets/data/movers";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultMoverImage } from "@/components/MoverListItem";
import { useQuery } from "@tanstack/react-query";
import { getMover } from "@/api-client";
import Spinner from "@/components/Spinner";
import { err } from "react-native-svg";
import { Review } from "@/constants/types";

const MoverDetailScreen = () => {
  const colorScheme = useColorScheme() || "light";
  const { id } = useLocalSearchParams();
  console.log(id);

  const {
    data: mover,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mover", id],
    queryFn: () => getMover(id as string),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50%",
        }}
      >
        <Spinner />
      </View>
    );

  if (isError)
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50%",
        }}
      >
        <Text>{error.message}</Text>
      </View>
    );

  if (!mover) {
    return (
      <Text style={{ color: Colors[colorScheme].text }}>Mover not found</Text>
    );
  }
  const handleBookMover = (_id: string) => {
    router.push({
      pathname: "/(bookingMove)/how",
      params: { moverId: _id },
    });
  };

  return (
    <ScrollView
      style={[
        styles.moverContainer,
        { backgroundColor: Colors[colorScheme].backgroundAccent },
      ]}
    >
      <Stack.Screen options={{ title: mover.businessName }} />

      <Image
        source={{ uri: mover.companyLogo || defaultMoverImage }}
        style={styles.moverLogo}
      />
      <View style={styles.moverCard}>
        <Text
          style={[
            styles.moverName,
            { color: Colors[colorScheme].titlePrimary },
          ]}
        >
          {mover.businessName}
        </Text>
        <Text
          style={[
            styles.moverArea,
            { color: Colors[colorScheme].titleSecondary },
          ]}
        >
          {mover.serviceArea}
        </Text>
        <Text
          style={[styles.moverDescription, { color: Colors[colorScheme].text }]}
        >
          {mover.description}
        </Text>
        <View style={styles.servicesContainer}>
          <Text
            style={[styles.servicesLabel, { color: Colors[colorScheme].text }]}
          >
            Services Offered:
          </Text>
          {mover.services.map((service, index) => (
            <View key={index} style={styles.serviceItemContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color={Colors[colorScheme].tint}
              />
              <Text
                style={[
                  styles.serviceItem,
                  { color: Colors[colorScheme].text },
                ]}
              >
                {service}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Ionicons
              key={index}
              name={
                index < Math.floor(mover.averageRating)
                  ? "star"
                  : "star-outline"
              }
              size={18}
              color={Colors[colorScheme].accentColor}
            />
          ))}
          <Text
            style={[styles.ratingText, { color: Colors[colorScheme].text }]}
          >
            {mover.averageRating.toFixed(1)} / 5
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.bookButton,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={() => handleBookMover(mover._id)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: Colors[colorScheme].text, fontSize: 20 }}>
          Reviews:
        </Text>
        {mover.reviews && mover.reviews.length > 0 ? (
          mover.reviews.map((review: Review, index) => (
            <View
              key={review._id}
              style={[
                styles.reviewCard,
                { backgroundColor: Colors[colorScheme].background },
              ]}
            >
              <Text
                style={[
                  styles.reviewerName,
                  { color: Colors[colorScheme].text },
                ]}
              >
                {review.userId ? `${review.userId.firstName}` : "Anonymous"}
              </Text>
              <Text
                style={[styles.reviewText, { color: Colors[colorScheme].text }]}
              >
                {review.reviewText}
              </Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Ionicons
                    key={index}
                    name={
                      index < Math.floor(review.rating)
                        ? "star"
                        : "star-outline"
                    }
                    size={16}
                    color={Colors[colorScheme].accentColor}
                  />
                ))}
                <Text
                  style={[
                    styles.ratingText,
                    { color: Colors[colorScheme].text },
                  ]}
                >
                  {review.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text
            style={[styles.noReviewText, { color: Colors[colorScheme].text }]}
          >
            No reviews yet.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MoverDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  promptContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  promptText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  moversList: {
    paddingBottom: 16,
  },
  moverContainer: {
    flexDirection: "column",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  moverLogo: {
    width: "100%",
    height: 200,
    borderRadius: 32,
    marginRight: 16,
  },
  moverCard: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  moverName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  moverArea: {
    fontSize: 16,
    marginBottom: 10,
  },
  moverDescription: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 20,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  servicesLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  serviceItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  serviceItem: {
    marginLeft: 6,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  bookButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewCard: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 8,
  },
  noReviewText: {
    textAlign: "center",
    fontSize: 16,
  },
});
