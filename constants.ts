import { StyleSheet, Text, View, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const SCREEN = {
  WIDTH: windowWidth,
  HEIGHT: windowHeight,
};
