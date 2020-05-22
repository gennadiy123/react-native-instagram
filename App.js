import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { RegistScreen } from "./screens/RegistScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/home/HomeScreen";
import { auth } from "./firebase/config";
import { store } from "./redux/store";
import { AppLoading } from "expo";
import * as Font from "expo-font";

const Stack = createStackNavigator();

async function loadAppAplication() {
  await Font.loadAsync({
    "ubuntu-regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);

  let content = (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomePage"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );

  const useRoute = (isAuth) => {
    if (isAuth) {
      return content;
    }
    return (content = (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitleAlign: "center",
            headerTitle: "Log in",
            headerStyle: {
              backgroundColor: Platform.OS === "ios" ? "black" : "white",
            },
            headerTintColor: Platform.OS === "ios" ? "blue" : "black",
          }}
          name="SignIn"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerTitleAlign: "center",
            headerTitle: "Registration",
            headerStyle: {
              backgroundColor: Platform.OS === "ios" ? "black" : "white",
            },
            headerTintColor: Platform.OS === "ios" ? "blue" : "black",
          }}
          name="Registration"
          component={RegistScreen}
        />
      </Stack.Navigator>
    ));
  };

  useEffect(() => {
    AuthStateChanged();
  }, []);

  const AuthStateChanged = async () => {
    await auth.onAuthStateChanged((user) => {
      if (user === null) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    });
  };
  console.log("isAuth", isAuth);
  const routing = useRoute(isAuth);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAppAplication}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
