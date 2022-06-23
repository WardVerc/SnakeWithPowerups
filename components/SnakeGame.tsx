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
  const [foodSize, setFoodSize] = useState(SNAKE.WIDTH);
  const [speed, setSpeed] = useState(SNAKE.SPEED);
  const [foodLocation, setFoodLocation] = useState(SNAKE.FOOD_START_POSITION);
  const [powerupLocation, setPowerupLocation] = useState(
    SNAKE.POWERUP_START_POSITION
  );
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

  const powerups = [
    function () {
      setFoodSize(SNAKE.WIDTH * 2);
    },
    function () {
      setSpeed(30);
    },
  ];

  const activatePowerup = () => {
    setScore(score + 1);
    if (score === 5) {
      powerups[0]();
    }
    if (score === 10) {
      powerups[1]();
    }
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
        const isSnakeInFoodSmall =
          head[0] === foodLocation[0] && head[1] === foodLocation[1];
        const isSnakeInFoodBigxy =
          foodSize === SNAKE.WIDTH * 2 &&
          head[0] === foodLocation[0] + SNAKE.WIDTH &&
          head[1] === foodLocation[1] + SNAKE.WIDTH;
        const isSnakeInFoodBigx =
          foodSize === SNAKE.WIDTH * 2 &&
          head[0] === foodLocation[0] + SNAKE.WIDTH &&
          head[1] === foodLocation[1];
        const isSnakeInFoodBigy =
          foodSize === SNAKE.WIDTH * 2 &&
          head[0] === foodLocation[0] &&
          head[1] === foodLocation[1] + SNAKE.WIDTH;

        if (
          isSnakeInFoodSmall ||
          isSnakeInFoodBigxy ||
          isSnakeInFoodBigx ||
          isSnakeInFoodBigy
        ) {
          snakey.unshift([head[0], head[1] + SNAKE.WIDTH]);
          randomizeFoodLocation();
          setScore(score + 1);
        }

        //check eat powerup
        if (head[0] === powerupLocation[0] && head[1] === powerupLocation[1]) {
          activatePowerup();
        }

        checkCollisions();

        snakey.shift();
        setSnake(snakey);
      }, speed);
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
    setSpeed(SNAKE.SPEED);
    setFoodSize(SNAKE.WIDTH);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleGameOverClose = () => {
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
        <Dialog.Description>Your score was: {score}</Dialog.Description>
        <Dialog.Description>Play again?</Dialog.Description>
        <Dialog.Button label="Play" onPress={handleGameOverClose} />
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
        style={[
          styles.food,
          { left: foodLocation[0], top: foodLocation[1] },
          { width: foodSize, height: foodSize },
        ]}
      />
      {score % 5 === 0 ? (
        <View
          style={[
            styles.powerup,
            { left: powerupLocation[0], top: powerupLocation[1] },
          ]}
        ></View>
      ) : null}
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
  },
  powerup: {
    position: "absolute",
    backgroundColor: "cyan",
    borderStyle: "solid",
    borderWidth: 2,
    width: SNAKE.WIDTH,
    height: SNAKE.WIDTH,
  },
});
