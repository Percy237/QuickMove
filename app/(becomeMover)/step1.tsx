// app/step1.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Animated,
  Easing,
  Image,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { MoverFormData, Services } from "@/constants/types";
import ProgressBar from "@/components/ProgressBar";
import * as ImagePicker from "expo-image-picker";
import { ImageData } from "@/constants/types";

import { CheckBox } from "react-native-elements";
import { useFormContext } from "@/context/FormContext";
import { useBecomeMoverProgressBar } from "@/context/BecomeMoverProgressBar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const defaultUploadImage =
  "https://th.bing.com/th/id/OIP.9gVPpQsQKxwDqOAou_KYQQAAAA?w=275&h=183&rs=1&pid=ImgDetMain";

export default function Step1() {
  const colorScheme = useColorScheme() || "light";
  const { formData, setFormData } = useFormContext();
  const router = useRouter();
  const { handleNext } = useBecomeMoverProgressBar();
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MoverFormData>({
    defaultValues: {
      businessName: formData.businessName || "",
      businessAddress: formData.businessAddress || "",
      serviceArea: formData.serviceArea || "",
      services: Array.isArray(formData.services) ? formData.services : [],
      companyLogo: formData.companyLogo || { uri: "", name: "", type: "" },
      description: formData.description || "",
      longitude: formData.latitude || 0,
      latitude: formData.latitude || 0,
    },
  });

  const onSubmit = (data: MoverFormData) => {
    setFormData({ ...data, longitude, latitude });
    handleNext();
    router.push("/step2");
  };
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);

  const [imagesUri, setImagesUri] = useState<
    Record<string, { uri: string; name: string }>
  >({});

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <ProgressBar />
      <Text style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}>
        Business Information
      </Text>

      <Animated.View
        style={[
          { width: "100%", height: "70%" },
          { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
          Business Name
        </Text>
        <Controller
          control={control}
          // rules={{ required: "Business name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your business name"
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  backgroundColor: Colors[colorScheme].background,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              placeholderTextColor={Colors[colorScheme].text}
            />
          )}
          name="businessName"
        />
        {errors.businessName && (
          <Text style={styles.errorText}>{errors.businessName.message}</Text>
        )}
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
          Service Area
        </Text>
        <Controller
          control={control}
          // rules={{ required: "Enter your service area" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your service area"
              style={[
                styles.input,
                {
                  color: Colors[colorScheme].text,
                  backgroundColor: Colors[colorScheme].background,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              placeholderTextColor={Colors[colorScheme].text}
            />
          )}
          name="serviceArea"
        />
        {errors.businessName && (
          <Text style={styles.errorText}>{errors.businessName.message}</Text>
        )}
        <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
          Business Address
        </Text>
        <Controller
          control={control}
          // rules={{ required: "Business address is required" }}
          name="businessAddress"
          render={({ field: { onChange, onBlur, value } }) => (
            <GooglePlacesAutocomplete
              placeholder="Business Address"
              onPress={(data, details = null) => {
                const selectedAddress = data.description;
                onChange(selectedAddress);
                if (details) {
                  const location = {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  };
                  setLongitude(location.longitude);
                  setLatitude(location.latitude);
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
                style: [styles.input, { width: "100%" }],
              }}
              onFail={(error) => console.log(error)}
              fetchDetails={true}
              debounce={200}
            />
          )}
        />
        {errors.businessAddress && (
          <Text style={styles.errorText}>{errors.businessAddress.message}</Text>
        )}
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={handleSubmit(onSubmit)}
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
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  documentPreview: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 80,
  },
});
