import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Controls from "./components/Controls";
import Header from "./components/Header";
import SnakeGame from "./components/SnakeGame";
import { SCREEN } from "./constants";

export default function App() {
  const [direction, setDirection] = useState("right");

  return (
    <View style={styles.container}>
      <View style={[styles.rowContainer, styles.headerContainer]}>
        <Header direction={direction} />
      </View>
      <View style={[styles.rowContainer, styles.gameContainer]}>
        <SnakeGame direction={direction} />
      </View>
      <View style={[styles.rowContainer, styles.controlsContainer]}>
        <Controls direction={direction} setDirection={setDirection} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowContainer: {
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN.WIDTH,
  },
  headerContainer: {
    flex: 1,
  },
  gameContainer: {
    flex: 3,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
