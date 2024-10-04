import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import React, { useMemo } from "react";
import { useBookMoveFormContext } from "@/context/BookMoveContext";
import { useQuery } from "@tanstack/react-query";
import { getPricing } from "@/api-client";

const BookingSummary = () => {
  const { formData } = useBookMoveFormContext();

  const {
    data: moverPricing,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["moverPricing", formData.moverId],
    queryFn: () => getPricing(formData.moverId as string),
    enabled: !!formData.moverId,
  });

  // Calculate price based on form data (you can adjust this logic)
  const totalPrice = useMemo(() => {
    if (!moverPricing || !formData) return 0;
    const selectedService = moverPricing.services.find(
      (service: any) => service.serviceType === formData.service
    );
    console.log("selectedService: ", selectedService);
    if (!selectedService) return 0;
    const { basePrice, chargePerKm } = selectedService;
    const distance = formData.distance || 0;
    return basePrice + chargePerKm * distance;
  }, [moverPricing, formData]);

  if (isLoading) return <Text>Loading pricing...</Text>;
  if (isError) return <Text>Error loading pricing: {error.message}</Text>;

  const handleSubmit = () => {
    const finalPrice = totalPrice.toFixed(2);
    const finalData = { finalPrice, ...formData };
    // Handle the booking submission here (e.g., call an API)
    console.log("Booking submitted with data: ", finalData);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.header}>Booking Summary</Text>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Current House:</Text>
          <Text style={styles.value}>{formData.currentHouse}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Current House Floor Number:</Text>
          <Text style={styles.value}>{formData.currentHouseFloorNumber}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Current Location:</Text>
          <Text style={styles.value}>{formData.currentLocation.place}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Destination House Floor Number:</Text>
          <Text style={styles.value}>
            {formData.destinationHouseFloorNumber}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Destination Location:</Text>
          <Text style={styles.value}>{formData.destinationLocation.place}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{formData.distance.toFixed(2)} km</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formData.formattedDate}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{formData.formattedTime}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Number of Rooms:</Text>
          <Text style={styles.value}>{formData.nbRooms}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Service:</Text>
          <Text style={styles.value}>{formData.service}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Special Instructions:</Text>
          <Text style={styles.value}>{formData.specialInstructions}</Text>
        </View>
      </ScrollView>

      {/* Stacked Submit Button and Price */}
      <View style={styles.bottomContainer}>
        <Text style={styles.priceText}>
          Estimated Price: ${totalPrice.toFixed(2)}
        </Text>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default BookingSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  scrollViewContainer: {
    paddingBottom: 100, // Ensure there's enough space above the bottom container
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryItem: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
