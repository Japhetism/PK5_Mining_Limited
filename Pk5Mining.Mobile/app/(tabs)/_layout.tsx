import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, View } from "react-native";

export default function TabLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // This forces the very bottom system bar (where the back button is)
      // to match your app's tab bar color.
      NavigationBar.setBackgroundColorAsync('#1E1E1E');
      NavigationBar.setButtonStyleAsync('light'); // Makes buttons white
    }
  }, []);
  return (
    <>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent={true}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#F57C00", // active icon color
          tabBarInactiveTintColor: "#9CA3AF", // inactive icon color
          sceneStyle: { backgroundColor: '#1E1E1E' },
          tabBarStyle: {
            backgroundColor: "#1E1E1E", // bottom tab background
            borderTopWidth: 0, // remove top border
            // height: 60,
            paddingBottom: 5, // add some padding for better touch targets
            paddingTop: 5,
            elevation: 0, // remove shadow on Android
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color, size }) => (
              <Feather name="clipboard" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="leave"
          options={{
            title: "Leave",
            tabBarIcon: ({ color, size }) => (
              <Feather name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: "Report",
            tabBarIcon: ({ color, size }) => (
              <Feather name="alert-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
