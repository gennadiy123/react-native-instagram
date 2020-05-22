import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import { auth, firestore } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
export const UserScreen = () => {
  const dispatch = useDispatch();
  const { userId, userName, userAvatar } = useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]);
  const signOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_SIGNOUT" });
  };

  const getCollection = async () => {
    await firestore
      .collection("test")
      .where("userId", "==", userId)
      .onSnapshot((data) => setAllPosts(data.docs.map((doc) => doc.data())));
    console.log("userId", userId);
  };

  useEffect(() => {
    getCollection();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 350,
          borderRadius: 10,
          height: 120,
          marginBottom: 10,

          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            paddingTop: 10,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Hello!
        </Text>

        <Image
          style={{
            width: 100,
            height: 10,
            borderRadius: 50,
            marginBottom: 10,
          }}
          source={{
            uri: userAvatar,
          }}
        />

        <Button title="Logout" onPress={signOut} />
      </View>
      <FlatList
        data={allPosts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: 350,
                borderRadius: 10,
                height: 350,
                marginBottom: 10,
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  width: 100,
                  height: 100,
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    right: 0,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginBottom: 30,
                  }}
                />
                <Text style={styles.textName}>{item.userName}</Text>
              </View>
              <Text style={styles.textPost}>Post: {item.text}</Text>
              <View style={styles.like}>
                <Text>{item.likes}</Text>
              </View>
              {console.log("item.image", item.image)}

              <Image
                style={{
                  width: 330,
                  height: 230,
                  marginBottom: 10,
                  borderRadius: 10,
                  right: 10,
                  bottom: 30,
                  position: "absolute",
                }}
                source={{ uri: item.image }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "ubuntu-regular",

    flex: 1,
    paddingTop: 40,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  like: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 15,
    left: 15,
  },
  comment: {
    position: "absolute",
    bottom: 10,
    left: "40%",
  },
  textPost: {
    textAlign: "center",
    paddingTop: 10,
  },
  textName: {
    fontFamily: "ubuntu-bold",

    textAlign: "left",
    paddingLeft: 20,
    paddingTop: 15,
    fontWeight: "bold",
  },
});
