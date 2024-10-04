import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function BookingListNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TopTabs screenOptions={{ tabBarLabelStyle: { fontSize: 10 } }}>
        <TopTabs.Screen name="index" options={{ title: "Pending" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
