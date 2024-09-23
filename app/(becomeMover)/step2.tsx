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
import { CheckBox } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { useFormContext } from "@/context/FormContext";
import { MoverFormData, Services } from "@/constants/types";
import * as ImagePicker from "expo-image-picker";
import { ImageData } from "@/constants/types";
import Colors from "@/constants/Colors";
import ProgressBar from "@/components/ProgressBar";
import { useBecomeMoverProgressBar } from "@/context/BecomeMoverProgressBar";
import { useRouter } from "expo-router";
const defaultUploadImage =
  "https://th.bing.com/th/id/OIP.9gVPpQsQKxwDqOAou_KYQQAAAA?w=275&h=183&rs=1&pid=ImgDetMain";

const step3 = () => {
  const colorScheme = useColorScheme() || "light";
  const { formData, setFormData } = useFormContext();
  const { handleNext, handlePrev } = useBecomeMoverProgressBar();
  const router = useRouter();

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MoverFormData>({
    defaultValues: {
      serviceArea: formData.serviceArea || "",
      services: Array.isArray(formData.services) ? formData.services : [],
      companyLogo: formData.companyLogo || { uri: "", name: "", type: "" },
      description: formData.description || "",
    },
  });

  const onSubmit = (data: MoverFormData) => {
    setFormData(data);
    handleNext();
    router.push("/step3");
  };
  return (
    <View style={styles.container}>
      <ProgressBar />
      <Text style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}>
        Services & Logo
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                  height: 100,
                  textAlignVertical: "top",
                  color: Colors[colorScheme].text,
                  backgroundColor: Colors[colorScheme].background,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              placeholder="Description"
              onChangeText={onChange}
              value={value}
              multiline={true}
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
                  { backgroundColor: Colors[colorScheme].buttonPrimary },
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
      </ScrollView>
    </View>
  );
};

export default step3;

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
