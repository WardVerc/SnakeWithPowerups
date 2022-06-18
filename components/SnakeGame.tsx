import React, { useEffect, useRef, useState } from "react";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { SNAKE } from "../constants";

interface SnakeGameProps {
  direction: string;
}

const SnakeGame: FC<SnakeGameProps> = ({ direction }) => {
  const [snake, setSnake] = useState([
    [100, 100],
    [100 + SNAKE.WIDTH, 100],
  ]);
  let snakeInterval: string | number | NodeJS.Timer | undefined;

  useEffect(() => {
    snakeInterval = setInterval(() => {
      let snakey = [...snake];
      let head = snakey[snakey.length - 1];

      if (direction === "left") {
        head = [head[0] - SNAKE.WIDTH, head[1]];
      } else if (direction === "right") {
        head = [head[0] + SNAKE.WIDTH, head[1]];
      } else if (direction === "up") {
        head = [head[0], head[1] - SNAKE.WIDTH];
      } else if (direction === "down") {
        head = [head[0], head[1] + SNAKE.WIDTH];
      }

      snakey.push(head);
      snakey.shift();
      setSnake(snakey);
    }, 100);
    return () => {
      clearInterval(snakeInterval);
    };
  }, [snake]);

  return (
    <View style={styles.container}>
      {snake.map((bodyPart, idx) => {
        return (
          <View
            key={idx}
            style={[
              styles.snakeBodyPart,
              { left: bodyPart[0], top: bodyPart[1] },
            ]}
          ></View>
        );
      })}
      <View style={[styles.food, { left: 160, top: 300 }]} />
    </View>
  );
};

export default SnakeGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },
  snakeBodyPart: {
    position: "absolute",
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 2,
    width: SNAKE.WIDTH,
    height: SNAKE.WIDTH,
  },
  food: {
    position: "absolute",
    backgroundColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    width: SNAKE.WIDTH,
    height: SNAKE.WIDTH,
  },
});
