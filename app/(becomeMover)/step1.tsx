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

const defaultUploadImage =
  "https://th.bing.com/th/id/OIP.9gVPpQsQKxwDqOAou_KYQQAAAA?w=275&h=183&rs=1&pid=ImgDetMain";

export default function Step1() {
  const colorScheme = useColorScheme() || "light";
  const { formData, setFormData } = useFormContext();
  const router = useRouter();
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
    },
  });

  const onSubmit = (data: MoverFormData) => {
    setFormData(data);
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

  // handle pick image
  const pickImage = async (
    field: keyof MoverFormData,
    onChange: (data: ImageData) => void
  ) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);

    if (!result.canceled) {
      const assets = result.assets[0];
      const imageData: ImageData = {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName ?? undefined,
        type: result.assets[0].mimeType ?? null,
      };

      onChange(imageData);
    }
  };

  const renderImagePreview = (image: string) => {
    if (!image)
      return (
        <View style={styles.documentPreview}>
          <Image source={{ uri: defaultUploadImage }} style={styles.image} />
        </View>
      );
    return (
      <View style={styles.documentPreview}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <ProgressBar step={1} totalSteps={3} />
      <Text style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}>
        Business Information
      </Text>
      <ScrollView>
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Business Name
          </Text>
          <Controller
            control={control}
            rules={{ required: "Business name is required" }}
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
            rules={{ required: "Enter your service area" }}
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
            rules={{ required: "Business address is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your business address"
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
            name="businessAddress"
          />
          {errors.businessAddress && (
            <Text style={styles.errorText}>
              {errors.businessAddress.message}
            </Text>
          )}

          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Description
          </Text>

          <Controller
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    height: 100, // Set a height for the text area
                    textAlignVertical: "top", // Align text to the top of the text area
                    color: Colors[colorScheme].text,
                    backgroundColor: Colors[colorScheme].background,
                    borderColor: Colors[colorScheme].border,
                  },
                ]}
                placeholder="Description"
                onChangeText={onChange}
                value={value}
                multiline={true} // Allows the TextInput to behave as a text area
              />
            )}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Services
          </Text>
          <View>
            {Services.map((service) => (
              <Controller
                key={service}
                control={control}
                name="services"
                render={({ field: { value = [], onChange } }) => (
                  <CheckBox
                    title={service}
                    checked={value.includes(service)}
                    onPress={() => {
                      const newValue = value.includes(service)
                        ? value.filter((item) => item !== service)
                        : [...value, service];
                      onChange(newValue);
                    }}
                  />
                )}
              />
            ))}
            {errors.services && (
              <Text style={{ color: "red" }}>
                Please select at least one service.
              </Text>
            )}
          </View>
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Company Logo
          </Text>
          <Controller
            control={control}
            rules={{ required: "Company Logo is required" }}
            name="companyLogo"
            render={({ field: { onChange, value } }) => (
              <>
                {renderImagePreview(value.uri)}
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: Colors[colorScheme].buttonPrimary }, // Optional: Use colorScheme for dynamic colors
                  ]}
                  onPress={() => pickImage("companyLogo", onChange)}
                >
                  <Text
                    style={[{ color: Colors[colorScheme].buttonTextPrimary }]}
                  >
                    {value ? "Image Uploaded" : "Upload Image"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
          {errors.companyLogo && (
            <Text style={styles.errorText}>{errors.companyLogo.message}</Text>
          )}
        </Animated.View>
      </ScrollView>

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
