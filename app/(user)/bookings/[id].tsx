import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useSegments } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MapView, { Marker } from "react-native-maps"; // import MapView components
import Spinner from "@/components/Spinner";
import { useToast } from "react-native-toast-notifications";

import {
  confirmBooking,
  declineBooking,
  getBooking,
  inProgressBooking,
} from "@/api-client"; // Assuming `getBooking` retrieves booking data by ID
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";

const BookingDetailScreen = () => {
  const colorScheme = useColorScheme() || "light";
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    data: booking,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id as string),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: declineBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.show("Booking declined", {
        type: "success",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
    onError: (error) => {
      console.log("Failed to decline booking:", error);
      toast.show("Failed to decline booking", {
        type: "danger",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
  });

  const mutateConfirmBooking = useMutation({
    mutationFn: confirmBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["mover-bookings"] });
      toast.show("Booking confirmed", {
        type: "success",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
    onError: (error) => {
      console.log("Failed to confirm booking:", error);
      toast.show("Failed to confirm booking", {
        type: "danger",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
  });
  const mutateInProgressBooking = useMutation({
    mutationFn: inProgressBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.show("Transit in progress", {
        type: "success",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
    onError: (error) => {
      console.error("Failed to confirm booking:", error);
      toast.show("Failed to mark booking in progress booking", {
        type: "danger",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
  });

  const mutateOnCompleteBooking = useMutation({
    mutationFn: inProgressBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.show("Transit in progress", {
        type: "success",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
    onError: (error) => {
      console.error("Failed to confirm booking:", error);
      toast.show("Failed to mark transit in progress booking", {
        type: "danger",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
  });

  const onCompleteBooking = () => {
    mutateOnCompleteBooking.mutate(id as string);
  };

  const onDeclineBooking = () => {
    mutation.mutate(id as string);
  };
  const onConfirmBooking = () => {
    console.log(id);
    mutateConfirmBooking.mutate(id as string);
  };
  const onInProgressBooking = () => {
    console.log(id);
    mutateInProgressBooking.mutate(id as string);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !booking) {
    return <Text>Error loading booking details</Text>;
  }

  const {
    currentLocation,
    destinationLocation,
    finalPrice,
    service,
    nbRooms,
    formattedDate,
    formattedTime,
    currentHouse,
    userId,
    currentHouseLocation,
    destinationHouseLocation,
    currentHouseFloorNumber,
    destinationHouseFloorNumber,
    status,
  } = booking;

  const initialRegion = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <Stack.Screen options={{ title: `${userId.firstName}` }} />

        <View style={styles.infoContainer}>
          <Text style={styles.heading}>Booking Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Customer:</Text>
            <Text style={styles.value}>
              {userId.firstName} {userId.lastName}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Service:</Text>
            <Text style={styles.value}>{service}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Current House:</Text>
            <Text style={styles.value}>{currentHouse}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>House Location:</Text>
            <Text style={styles.value}>{currentHouseLocation}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Floor Number:</Text>
            <Text style={styles.value}>{currentHouseFloorNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Rooms:</Text>
            <Text style={styles.value}>{nbRooms}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Delivery house location:</Text>
            <Text style={styles.value}>{destinationHouseLocation}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Delivery house floor number:</Text>
            <Text style={styles.value}>{destinationHouseFloorNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Preferred Date:</Text>
            <Text style={styles.value}>
              {formattedDate} at {formattedTime}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{finalPrice} FCFA</Text>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.mapHeading}>Route Map</Text>
          <MapView style={styles.map} initialRegion={initialRegion}>
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Pickup Location"
              description={currentLocation.place}
            />

            <Marker
              coordinate={{
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
              }}
              title="Destination"
              description={destinationLocation.place}
            />

            {currentLocation && destinationLocation && (
              <MapViewDirections
                origin={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                destination={{
                  latitude: destinationLocation.latitude,
                  longitude: destinationLocation.longitude,
                }}
                apikey={process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY!}
                strokeWidth={3}
                strokeColor={Colors[colorScheme].tint}
              />
            )}
          </MapView>
        </View>
      </ScrollView>
      {status === "pending" && (
        <View style={styles.pendingActionsContainer}>
          <Text>When Logistic Provider confirm then you can pay</Text>
        </View>
      )}

      {status === "confirmed" && (
        <View style={styles.paidActionsContainer}>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Ionicons name="cash" size={20} color="#003566" />
            <Text style={styles.buttonTextSecondary}>Pay for transit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infoContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003566",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001D3D",
  },
  value: {
    fontSize: 16,
    color: "#003566",
  },
  mapContainer: {
    marginVertical: 16,
  },
  mapHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#001D3D",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  pendingActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    padding: 16,
  },
  paidActionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
    padding: 16,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FF5C5C",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#003566",
    borderWidth: 1,
  },
  buttonTextSecondary: {
    color: "#003566",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
