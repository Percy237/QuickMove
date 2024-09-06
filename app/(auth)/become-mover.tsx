import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ScrollView,
  Animated,
  Easing,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { MoverFormData, Services } from "@/constants/types";
import { useForm, Controller } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { CheckBox } from "react-native-elements";

const logisticIllustration = require("../../assets/images/logistics-concept-illustration.png");

const BecomeMover = () => {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MoverFormData>();

  const [documentUris, setDocumentUris] = useState<
    Record<string, { uri: string; name: string }>
  >({});
  const [imagesUri, setImagesUri] = useState<
    Record<string, { uri: string; name: string }>
  >({});

  //handle upload document
  const handleDocumentUpload = async (
    field: string,
    onChange: (uri: string) => void
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/*",
        copyToCacheDirectory: true,
      });

      const assets = result.assets;
      if (!assets) return;
      const file = assets[0];
      onChange(file.uri);
      setDocumentUris((prev) => ({
        ...prev,
        [field]: { uri: file.uri, name: file.name },
      }));
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

  // handle pick image
  const pickImage = async (field: string, onChange: (uri: string) => void) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
      setImagesUri((prev) => ({
        ...prev,
        [field]: { uri: result.assets[0].uri, name: result.assets[0].fileName },
      }));
    }
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

  const selectedServices = watch("services");

  const mutation = useMutation({
    onSuccess: async () => {
      //invalidate credentials
      console.warn("Form submitted successfully");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const renderDocumentPreview = (field: string) => {
    const document = documentUris[field];
    if (!document) return null;

    return (
      <View style={styles.documentPreview}>
        <Text style={styles.documentName}>{document.name}</Text>
      </View>
    );
  };

  const renderImagePreview = (field: string) => {
    const image = imagesUri[field];
    if (!image)
      return (
        <View style={styles.documentPreview}>
          <Image source={{ uri: defaultUploadImage }} style={styles.image} />
        </View>
      );
    return (
      <View style={styles.documentPreview}>
        <Image source={{ uri: image.uri }} style={styles.image} />
      </View>
    );
  };

  const onSubmit = (data: MoverFormData) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Stack.Screen options={{ title: "Become a mover" }} />
      <ScrollView>
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Image source={logisticIllustration} style={styles.image} />
          <Text
            style={{
              color: Colors[colorScheme].text,
              marginBottom: 20,
              marginTop: 10,

              fontSize: 16,
            }}
          >
            Ready to take your moving business to the next level? Fill out the
            form below to become a verified mover on our platform. Provide
            accurate details and upload the necessary documents to ensure a
            smooth onboarding process.
          </Text>
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
                    verticalAlign: "top", // Align text to the top of the text area
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
            Business Registration Document
          </Text>
          {renderDocumentPreview("businessRegistrationDocument")}
          <Controller
            control={control}
            rules={{ required: "Business registration document is required" }}
            name="businessRegistrationDocument"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: Colors[colorScheme].buttonPrimary }, // Optional: Use colorScheme for dynamic colors
                ]}
                onPress={() =>
                  handleDocumentUpload("businessRegistrationDocument", onChange)
                }
              >
                <Text
                  style={[{ color: Colors[colorScheme].buttonTextPrimary }]}
                >
                  {value ? "Document Uploaded" : "Upload Document"}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.businessRegistrationDocument && (
            <Text style={styles.errorText}>
              {errors.businessRegistrationDocument.message}
            </Text>
          )}

          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Government Issued Id (Front)
          </Text>
          {renderImagePreview("governmentIssuedIdFront")}
          <Controller
            control={control}
            name="governmentIssuedIdFront"
            rules={{ required: "Government Issued Id (Front) is required" }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: Colors[colorScheme].buttonPrimary }, // Optional: Use colorScheme for dynamic colors
                ]}
                onPress={() => pickImage("governmentIssuedIdFront", onChange)}
              >
                <Text
                  style={[{ color: Colors[colorScheme].buttonTextPrimary }]}
                >
                  {value ? "Image Uploaded" : "Upload Image"}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.governmentIssuedIdFront && (
            <Text style={styles.errorText}>
              {errors.governmentIssuedIdFront.message}
            </Text>
          )}

          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Company Logo
          </Text>
          {renderImagePreview("companyLogo")}
          <Controller
            control={control}
            rules={{ required: "Company Logo is required" }}
            name="companyLogo"
            render={({ field: { onChange, value } }) => (
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
            )}
          />
          {errors.companyLogo && (
            <Text style={styles.errorText}>{errors.companyLogo.message}</Text>
          )}

          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Government Issued Id (Back)
          </Text>
          {renderImagePreview("governmentIssuedIdBack")}
          <Controller
            control={control}
            name="governmentIssuedIdBack"
            rules={{
              required: "Government Issued Id (Back) document is required",
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: Colors[colorScheme].buttonPrimary }, // Optional: Use colorScheme for dynamic colors
                ]}
                onPress={() => pickImage("governmentIssuedIdBack", onChange)}
              >
                <Text
                  style={[{ color: Colors[colorScheme].buttonTextPrimary }]}
                >
                  {value ? "Image Uploaded" : "Upload Image"}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.governmentIssuedIdBack && (
            <Text style={styles.errorText}>
              {errors.governmentIssuedIdBack.message}
            </Text>
          )}
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Insurance Document
          </Text>
          {renderDocumentPreview("insuranceDocument")}
          <Controller
            control={control}
            name="insuranceDocument"
            rules={{
              required: " Insurance document is required",
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: Colors[colorScheme].buttonPrimary }, // Optional: Use colorScheme for dynamic colors
                ]}
                onPress={() =>
                  handleDocumentUpload("insuranceDocument", onChange)
                }
              >
                <Text
                  style={[{ color: Colors[colorScheme].buttonTextPrimary }]}
                >
                  {value ? "Document Uploaded" : "Upload Document"}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.insuranceDocument && (
            <Text style={styles.errorText}>
              {errors.insuranceDocument.message}
            </Text>
          )}
          <Button
            title="Submit"
            disabled={mutation.isPending}
            onPress={handleSubmit(onSubmit)}
            color={Colors[colorScheme].tint}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BecomeMover;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
  documentSection: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  signUpPrompt: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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
  documentName: {
    color: "#333",
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
});
