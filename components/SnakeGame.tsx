import React from "react";
import { FC } from "react";
import { Text } from "react-native";

interface SnakeGameProps {
  direction: string;
}

const SnakeGame: FC<SnakeGameProps> = () => {
  return <Text>SnakeGame component!</Text>;
};

export default SnakeGame;
