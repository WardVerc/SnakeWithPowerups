import { StyleSheet, Text, View, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const SCREEN = {
  WIDTH: windowWidth,
  HEIGHT: windowHeight,
};

export const SNAKE = {
  WIDTH: 20,
  START_POSITION: [
    [100, 100],
    [120, 100],
  ],
  FOOD_START_POSITION: [160, 300],
  POWERUP_START_POSITION: [300, 100],
  SPEED: 100,
};
