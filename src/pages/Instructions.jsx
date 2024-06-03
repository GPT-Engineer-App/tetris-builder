import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const Instructions = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <VStack spacing={4}>
        <Text fontSize="2xl">How to Play Tetris</Text>
        <Text>Use the arrow keys to move and rotate the tetrominoes:</Text>
        <Text>Left Arrow: Move left</Text>
        <Text>Right Arrow: Move right</Text>
        <Text>Down Arrow: Move down faster</Text>
        <Text>Up Arrow: Rotate</Text>
        <Text>Press the Restart button to start a new game.</Text>
      </VStack>
    </Box>
  );
};

export default Instructions;
