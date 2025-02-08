import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator> 
      
      <Stack.Screen name="Jobs" component={HomeScreen} />
      <Stack.Screen name="JobDetails" component={JobDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" size={size} color={color} />
        )}} 
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={{ tabBarIcon: ({ color, size }) => (
          <Ionicons name="bookmark" size={size} color={color} />
        )}} 
      />
    </Tab.Navigator>
  );
}
