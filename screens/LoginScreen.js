import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation, route }) => {
  const [textValue, setTextValue] = useState(initialState);
  const dispatch = useDispatch();
  const loginUser = async () => {
    const { email, password } = textValue;
    console.log("email", email);
    console.log("password", password);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const currentUser = await auth.currentUser;
      console.log("current LoginScreen", currentUser);
      await dispatch({
        type: "CURRENT_USER",
        payload: {
          userName: currentUser.displayName,
          userId: currentUser.uid,
          userPhoto: currentUser.photoURL,
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  };

  navigation.setOptions({
    headerRight: () => (
      <Text
        style={styles.register}
        onPress={() => navigation.navigate("Registration")}
      >
        Registration -->
      </Text>
    ),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={{ ...StyleSheet.absoluteFill }}>
            <Image
              source={require("../image/background.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
          <Text>Email</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Email"
            onChangeText={(value) =>
              setTextValue({ ...textValue, email: value })
            }
          />
          <Text>Password</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Password"
            onChangeText={(value) =>
              setTextValue({ ...textValue, password: value })
            }
          />
          <Button title="Log In" onPress={loginUser} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    fontFamily: "ubuntu-regular",

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txtInput: {
    width: "70%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
  },
  register: {
    color: "blue",
    fontSize: 16,
    paddingRight: 30,
  },
});
