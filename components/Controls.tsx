import React from "react";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SCREEN } from "../constants";

interface ControlsProps {
  direction: string;
  setDirection: (value: string) => void;
}

const Controls: FC<ControlsProps> = ({ direction, setDirection }) => {
  const handleLeft = () => {
    if (direction !== "left" && direction !== "right") {
      setDirection("left");
    }
  };

  const handleRight = () => {
    if (direction !== "left" && direction !== "right") {
      setDirection("right");
    }
  };

  const handleUp = () => {
    if (direction !== "up" && direction !== "down") {
      setDirection("up");
    }
  };

  const handleDown = () => {
    if (direction !== "up" && direction !== "down") {
      setDirection("down");
    }
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPressIn={() => handleLeft()}>
          <Text>Left</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.btn, { flex: 2 }]}
          onPressIn={() => handleUp()}
        >
          <Text>Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { flex: 2 }]}
          onPressIn={() => handleDown()}
        >
          <Text>Down</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPressIn={() => handleRight()}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN.WIDTH,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  buttonContainer: {
    width: "33%",
  },
  btn: {
    backgroundColor: "#2875a6",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    margin: 2,
  },
});

export default Controls;
