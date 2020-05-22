import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostBaseScreen } from "./tabs/PostBaseScreen";
import { AddPostScreen } from "./tabs/AddPostScreen";
import { UserScreen } from "./tabs/UserScreen";

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="ios-contact"
              size={focused ? 40 : 35}
              color={"grey"}
            />
          ),
        }}
        name="User"
        component={UserScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="ios-chatbubbles"
              size={focused ? 40 : 35}
              color={"blue"}
            />
          ),
        }}
        name="Post"
        component={PostBaseScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="ios-add-circle-outline"
              size={focused ? 45 : 40}
              color={"green"}
            />
          ),
        }}
        name="Add Post"
        component={AddPostScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "ubuntu-regular",

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
