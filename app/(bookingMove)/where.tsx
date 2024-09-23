import {
  StyleSheet,
  View,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useBookMoveProgressBar } from "@/context/BookMoveProgressBar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import BookMoveProgressBar from "@/components/BookMoveProgressBar";
import { useBookMoveFormContext } from "@/context/BookMoveContext";
import MapViewDirections from "react-native-maps-directions";

const Where = () => {
  const router = useRouter();
  const colorScheme = useColorScheme() || "light";
  const { handleNext, handlePrev } = useBookMoveProgressBar();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [destinationLocation, setDestinationLocation] = useState<any>(null);
  const [queryCurrentLocation, setQueryCurrentLocation] = useState("");
  const [queryDestinationLocation, setQueryDestinationLocation] = useState("");
  const { formData, setFormData } = useBookMoveFormContext();

  const onSubmit = () => {
    handleNext();
    setFormData({ currentLocation, destinationLocation });
    router.push("/when");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <BookMoveProgressBar />

      {/* Google Places Autocomplete for Current Location */}
      <View style={{ marginTop: 20 }}>
        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="search"
              size={24}
              color={Colors[colorScheme].tint}
            />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            placeholder="Your current location"
            onPress={(data, details = null) => {
              if (details) {
                const location = {
                  place: data.description,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setCurrentLocation(location);
              }
            }}
            query={{
              key: `${process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY!}`,
              language: "en",
              components: "country:cm",
            }}
            styles={{
              textInputContainer: {
                width: "100%",
                zIndex: 2, // Ensure it is above the map
              },
              textInput: {
                height: 38,
                color: "#000",
                fontSize: 16,
              },
              listView: {
                zIndex: 3, // Ensure it is above the map
              },
              predefinedPlacesDescription: {
                color: "#000",
              },
            }}
            textInputProps={{
              onChangeText: (text) => setQueryCurrentLocation(text),
              value: queryCurrentLocation,
            }}
            onFail={(error) => console.log(error)}
            fetchDetails={true}
            debounce={200}
          />
        </View>
      </View>

      {/* Google Places Autocomplete for Destination Location */}
      <View style={{ marginTop: 40 }}>
        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="search"
              size={24}
              color={Colors[colorScheme].tint}
            />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            placeholder="Your destination location"
            onPress={(data, details = null) => {
              if (details) {
                const location = {
                  place: data.description,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                setDestinationLocation(location);
              }
            }}
            query={{
              key: `${process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY!}`,
              language: "en",
              components: "country:cm",
            }}
            styles={{
              textInputContainer: {
                width: "100%",
                zIndex: 2, // Ensure it is above the map
              },
              textInput: {
                height: 38,
                color: "#000",
                fontSize: 16,
              },
              listView: {
                zIndex: 3, // Ensure it is above the map
              },
              predefinedPlacesDescription: {
                color: "#000",
              },
            }}
            textInputProps={{
              onChangeText: (text) => setQueryDestinationLocation(text),
              value: queryDestinationLocation,
            }}
            onFail={(error) => console.log(error)}
            fetchDetails={true}
            debounce={200}
          />
        </View>
      </View>

      {/* Map */}
      <TouchableWithoutFeedback>
        <MapView
          style={styles.map}
          region={{
            latitude: currentLocation ? currentLocation.latitude : 4.0469, // Default Cameroon coordinates
            longitude: currentLocation ? currentLocation.longitude : 9.7065,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.03421,
          }}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            />
          )}
          {destinationLocation && (
            <Marker
              coordinate={{
                latitude: destinationLocation.latitude,
                longitude: destinationLocation.longitude,
              }}
            />
          )}
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
      </TouchableWithoutFeedback>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={() => {
            router.back();
            handlePrev();
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonTextPrimary },
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={onSubmit}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonTextPrimary },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Where;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  map: {
    height: 400,
    width: "100%",
    zIndex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 5,
    zIndex: 2,
    position: "absolute",
  },
  iconButton: {
    marginRight: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
