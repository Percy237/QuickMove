// app/step2.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  useColorScheme,
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import ProgressBar from "@/components/ProgressBar";
import { MoverFormData } from "@/constants/types";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { useFormContext } from "@/context/FormContext";
import { ImageData } from "@/constants/types";
import { DocumentData } from "@/constants/types";
import { useBecomeMoverProgressBar } from "@/context/BecomeMoverProgressBar";

const defaultUploadImage =
  "https://th.bing.com/th/id/OIP.9gVPpQsQKxwDqOAou_KYQQAAAA?w=275&h=183&rs=1&pid=ImgDetMain";

export default function Step2() {
  const colorScheme = useColorScheme() || "light";
  const { formData, setFormData } = useFormContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MoverFormData>({
    defaultValues: {
      businessRegistrationDocument: formData.businessRegistrationDocument || {
        uri: "",
        name: "",
        type: "",
      },
      governmentIssuedIdFront: formData.governmentIssuedIdFront || {
        uri: "",
        name: "",
        type: "",
      },
      governmentIssuedIdBack: formData.governmentIssuedIdBack || {
        uri: "",
        name: "",
        type: "",
      },
    },
  });
  const router = useRouter();

  const { handlePrev, handleNext } = useBecomeMoverProgressBar();

  //handle upload document
  const handleDocumentUpload = async (
    field: keyof MoverFormData,
    onChange: (data: DocumentData) => void
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/*",
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const file: DocumentData = {
          uri: result.assets[0].uri,
          name: result.assets[0].name || "",
          type: result.assets[0].mimeType || "",
        };

        onChange(file); // Pass the object to onChange
      }
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

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

    if (!result.canceled) {
      const imageData: ImageData = {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName ?? undefined,
        type: result.assets[0].mimeType ?? null,
      };

      onChange(imageData);
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

  const renderDocumentPreview = (name?: string | undefined | null) => {
    if (!name) return null;

    return (
      <View style={styles.documentPreview}>
        <Text style={styles.documentName}>{name}</Text>
      </View>
    );
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
  const onSubmit = (data: MoverFormData) => {
    setFormData(data);
    handleNext();
    router.push("/step3");
  };

  return (
    <View style={styles.container}>
      <ProgressBar />
      <Text style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}>
        Identification Documents
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
            Business Registration Document
          </Text>

          <Controller
            control={control}
            rules={{ required: "Business registration document is required" }}
            name="businessRegistrationDocument"
            render={({ field: { onChange, value } }) => (
              <>
                {renderDocumentPreview(value.name)}
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: Colors[colorScheme].buttonPrimary }, // Optional: Use colorScheme for dynamic colors
                  ]}
                  onPress={() =>
                    handleDocumentUpload(
                      "businessRegistrationDocument",
                      onChange
                    )
                  }
                >
                  <Text
                    style={[{ color: Colors[colorScheme].buttonTextPrimary }]}
                  >
                    {value ? "Document Uploaded" : "Upload Document"}
                  </Text>
                </TouchableOpacity>
              </>
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

          <Controller
            control={control}
            name="governmentIssuedIdFront"
            rules={{ required: "Government Issued Id (Front) is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                {renderImagePreview(value.uri)}
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
              </>
            )}
          />
          {errors.governmentIssuedIdFront && (
            <Text style={styles.errorText}>
              {errors.governmentIssuedIdFront.message}
            </Text>
          )}
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Government Issued Id (Back)
          </Text>

          <Controller
            control={control}
            name="governmentIssuedIdBack"
            rules={{
              required: "Government Issued Id (Back) document is required",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {renderImagePreview(value.uri)}
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
              </>
            )}
          />
          {errors.governmentIssuedIdBack && (
            <Text style={styles.errorText}>
              {errors.governmentIssuedIdBack.message}
            </Text>
          )}
        </Animated.View>
      </ScrollView>

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
