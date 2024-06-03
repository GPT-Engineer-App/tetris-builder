import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, VStack, HStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp, FaRedo } from "react-icons/fa";

const TETROMINOS = {
  0: { shape: [[0]], color: "gray.200" },
  I: { shape: [[1, 1, 1, 1]], color: "cyan.500" },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "blue.500",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "orange.500",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow.500",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green.500",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "purple.500",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red.500",
  },
};

const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

const STAGE_WIDTH = 12;
const STAGE_HEIGHT = 20;

const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, "clear"]));

const Index = () => {
  const [stage, setStage] = useState(createStage());
  const [tetromino, setTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: STAGE_WIDTH / 2 - 2, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setStage(createStage());
    setTetromino(randomTetromino());
    setPosition({ x: STAGE_WIDTH / 2 - 2, y: 0 });
    setGameOver(false);
  };

  const moveTetromino = ({ x, y }) => {
    setPosition((prev) => ({ x: prev.x + x, y: prev.y + y }));
  };

  const rotateTetromino = () => {
    const rotatedTetromino = tetromino.shape[0].map((_, index) => tetromino.shape.map((col) => col[index])).reverse();
    setTetromino((prev) => ({ ...prev, shape: rotatedTetromino }));
  };

  const dropTetromino = () => {
    moveTetromino({ x: 0, y: 1 });
  };

  const updateStage = useCallback(() => {
    const newStage = stage.map((row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)));

    tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newStage[y + position.y][x + position.x] = [value, "clear"];
        }
      });
    });

    setStage(newStage);
  }, [position, tetromino, stage]);

  useEffect(() => {
    const interval = setInterval(() => {
      dropTetromino();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateStage();
  }, [position, tetromino, updateStage]);

  const handleKeyPress = useCallback(
    (event) => {
      if (gameOver) return;

      switch (event.key) {
        case "ArrowLeft":
          moveTetromino({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          moveTetromino({ x: 1, y: 0 });
          break;
        case "ArrowDown":
          dropTetromino();
          break;
        case "ArrowUp":
          rotateTetromino();
          break;
        default:
          break;
      }
    },
    [gameOver],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <VStack spacing={4}>
        <Text fontSize="2xl">Tetris</Text>
        <Grid templateColumns={`repeat(${STAGE_WIDTH}, 20px)`} gap={1}>
          {stage.map((row, y) => row.map((cell, x) => <GridItem key={`${y}-${x}`} w="20px" h="20px" bg={cell[0] === 0 ? "gray.200" : TETROMINOS[tetromino.shape[y - position.y] && tetromino.shape[y - position.y][x - position.x] ? tetromino.shape[y - position.y][x - position.x] : 0].color} border="1px solid" borderColor="gray.300" />))}
        </Grid>
        {gameOver && (
          <Text fontSize="xl" color="red.500">
            Game Over
          </Text>
        )}
        <HStack spacing={4}>
          <Button onClick={() => moveTetromino({ x: -1, y: 0 })} leftIcon={<FaArrowLeft />}>
            Left
          </Button>
          <Button onClick={() => moveTetromino({ x: 1, y: 0 })} rightIcon={<FaArrowRight />}>
            Right
          </Button>
          <Button onClick={dropTetromino} leftIcon={<FaArrowDown />}>
            Down
          </Button>
          <Button onClick={rotateTetromino} leftIcon={<FaArrowUp />}>
            Rotate
          </Button>
          <Button onClick={resetGame} leftIcon={<FaRedo />}>
            Restart
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Index;
