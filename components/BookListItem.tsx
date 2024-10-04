import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useSegments } from "expo-router";
import { BookingType } from "@/constants/types";

type MoverBookingListItemProps = {
  moverBookings: BookingType;
};

const BookListItem = ({ moverBookings }: MoverBookingListItemProps) => {
  const segments = useSegments();

  const formattedCreationDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(moverBookings.createdAt));

  return (
    <Link href={`/${segments[0]}/bookings/${moverBookings._id}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.details}>
          <Text style={styles.title}>Booking ID: {moverBookings._id}</Text>
          <Text style={styles.subtitle}>
            Created on: {formattedCreationDate}
          </Text>
          <Text style={styles.subtitle}>
            Date: {moverBookings.formattedDate} at {moverBookings.formattedTime}
          </Text>
          <Text style={styles.subtitle}>Service: {moverBookings.service}</Text>
          <Text style={styles.subtitle}>Rooms: {moverBookings.nbRooms}</Text>
          <Text style={styles.subtitle}>
            Price: {moverBookings.finalPrice} FCFA
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default BookListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  details: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001D3D", // Using one of your existing color palette colors
  },
  subtitle: {
    fontSize: 14,
    color: "#003566", // Subtle contrast color
    marginTop: 4,
  },
});
