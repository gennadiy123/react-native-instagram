import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PostScreen } from "./PostScreen";
import { MapScreen } from "./MapScreen";
import { CommentsScreen } from "./CommentsScreen";

const PostBase = createStackNavigator();

export const PostBaseScreen = () => (
  <PostBase.Navigator>
    <PostBase.Screen name="Posts" component={PostScreen} />
    <PostBase.Screen name="Map" component={MapScreen} />
    <PostBase.Screen name="Comments" component={CommentsScreen} />
  </PostBase.Navigator>
);
