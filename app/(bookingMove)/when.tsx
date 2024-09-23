import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useColorScheme } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Colors from "@/constants/Colors";
import { useBookMoveProgressBar } from "@/context/BookMoveProgressBar";
import BookMoveProgressBar from "@/components/BookMoveProgressBar";
import { useBookMoveFormContext } from "@/context/BookMoveContext";

const when = () => {
  const colorScheme = useColorScheme() || "light";
  const { handleNext, handlePrev } = useBookMoveProgressBar();
  const router = useRouter();
  const [service, setService] = useState<string>("");
  const { formData, setFormData } = useBookMoveFormContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(`Selected ${mode}:`, currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const onSubmit = (data: any) => {
    setFormData({ ...data, service, formattedDate, formattedTime });
    handleNext();
    router.push("/instructions");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <BookMoveProgressBar />
      <Text style={styles.label}>Which service do you want?</Text>
      <Controller
        control={control}
        rules={{
          required: "This field is required",
        }}
        name="service"
        render={({ field: { onChange, value } }) => (
          <Picker
            style={{
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].border,
            }}
            selectedValue={value}
            onValueChange={(selectedService) => {
              onChange(selectedService);
              setService(selectedService);
            }}
          >
            <Picker.Item label="Choose" value="" />
            <Picker.Item label="Full Service" value="Full-Service" />
            <Picker.Item label="Self Service" value="Self-Service" />
            <Picker.Item
              label="Specialized Service"
              value="Specialized Service"
            />
          </Picker>
        )}
      />
      {errors.service && (
        <Text style={styles.errorText}>{errors.service.message}</Text>
      )}

      <Text style={styles.label}>Select your preferred date and time:</Text>

      <View style={{ rowGap: 10 }}>
        <Button
          onPress={() => showMode("date")}
          title="Select date"
          color={Colors[colorScheme].buttonPrimary}
        />
        <Button
          onPress={() => showMode("time")}
          title="Select time"
          color={Colors[colorScheme].buttonPrimary}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {/* Display selected date and time */}
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>
          Selected Date: {formattedDate}
        </Text>
        <Text style={styles.selectedTimeText}>
          Selected Time: {formattedTime}
        </Text>
      </View>

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
};

export default when;

// Add styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: "gray",
  },
  datetimeContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  selectedDateContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  selectedTimeText: {
    fontSize: 16,
    color: "black",
  },
});
