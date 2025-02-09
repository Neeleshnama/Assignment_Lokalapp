

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import BookmarksScreen from "../screens/BookmarksScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768; // Check for tablets

function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: "#007bff" }, 
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: isLargeScreen ? 24 : 18 }, // Larger text for bigger screens
      }}
    > 
      <Stack.Screen name="Jobs" component={HomeScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailScreen} />
    </Stack.Navigator>
  );
}

function BookmarksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#007bff" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: isLargeScreen ? 24 : 18 },
      }}
    >
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: isLargeScreen ? 80 : 60, // Adjust height for larger screens
          paddingBottom: Platform.OS === "ios" ? 20 : 10, // Adjust padding for iOS
          backgroundColor: "#fff", // Ensure tab bar has a background
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "Home" ? "list" : "bookmark";
          return <Ionicons name={iconName} size={isLargeScreen ? 32 : size} color={color} />;
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: isLargeScreen ? 16 : 12, color: focused ? "#007bff" : "gray" }}>
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Bookmarks" component={BookmarksStack} />
    </Tab.Navigator>
  );
}
