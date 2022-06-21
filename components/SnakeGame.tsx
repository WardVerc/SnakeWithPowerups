import React, { useEffect, useState } from "react";
import { FC } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { SCREEN, SNAKE } from "../constants";
import Dialog from "react-native-dialog";

interface SnakeGameProps {
  direction: string;
  setDirection: (value: string) => void;
  score: number;
  setScore: (value: number) => void;
}

const SnakeGame: FC<SnakeGameProps> = ({
  direction,
  setDirection,
  score,
  setScore,
}) => {
  const [gameOver, setGameOver] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [currentHeight, setCurrentHeight] = useState(400);
  const [snake, setSnake] = useState(SNAKE.START_POSITION);
  const [foodLocation, setFoodLocation] = useState(SNAKE.FOOD_START_POSITION);
  let snakeInterval: string | number | NodeJS.Timer | undefined;

  const handleLayout = (event: LayoutChangeEvent) => {
    let { height } = event.nativeEvent.layout;
    setCurrentHeight(Math.floor(height));
  };

  const checkCollisions = () => {
    let snakey = [...snake];
    let head = snakey[snakey.length - 1];
    let maxw = SCREEN.WIDTH - SNAKE.WIDTH;
    let maxh = currentHeight - SNAKE.WIDTH;

    if (head[0] < 0 || head[1] < 0) {
      setGameOver(true);
    }
    if (head[0] >= maxw || head[1] >= maxh) {
      setGameOver(true);
    }

    snakey.map((bodyPart, idx) => {
      if (idx !== snakey.length - 1) {
        if (bodyPart[0] === head[0] && bodyPart[1] === head[1]) {
          setGameOver(true);
        }
      }
    });
  };

  const randomizeFoodLocation = () => {
    let maxw = SCREEN.WIDTH - SNAKE.WIDTH;
    let randomw = Math.random() * maxw;
    let maxh = currentHeight - SNAKE.WIDTH;
    let randomh = Math.random() * maxh;
    let x = Math.floor(randomw / SNAKE.WIDTH) * SNAKE.WIDTH;
    let y = Math.floor(randomh / SNAKE.WIDTH) * SNAKE.WIDTH;

    setFoodLocation([x, y]);
  };

  useEffect(() => {
    if (!menuOpen && !gameOver) {
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

        //check eat food
        if (head[0] === foodLocation[0] && head[1] === foodLocation[1]) {
          snakey.unshift([head[0], head[1] + SNAKE.WIDTH]);
          randomizeFoodLocation();
          setScore(score + 1);
        }

        checkCollisions();

        snakey.shift();
        setSnake(snakey);
      }, 100);
      return () => {
        clearInterval(snakeInterval);
      };
    }
  }, [snake, menuOpen, gameOver]);

  const resetGame = () => {
    setSnake(SNAKE.START_POSITION);
    setFoodLocation(SNAKE.FOOD_START_POSITION);
    setDirection("right");
    setScore(0);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleDialogClose = () => {
    resetGame();
    setGameOver(false);
  };

  return (
    <View onLayout={(e) => handleLayout(e)} style={styles.container}>
      <Dialog.Container visible={menuOpen}>
        <Dialog.Title>Start game</Dialog.Title>
        <Dialog.Description>Wanna go?</Dialog.Description>
        <Dialog.Button label="Go" onPress={handleMenuClose} />
      </Dialog.Container>
      <Dialog.Container visible={gameOver}>
        <Dialog.Title>Game over</Dialog.Title>
        <Dialog.Description>Play again?</Dialog.Description>
        <Dialog.Button label="Play" onPress={handleDialogClose} />
      </Dialog.Container>
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
      <View
        style={[styles.food, { left: foodLocation[0], top: foodLocation[1] }]}
      />
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
