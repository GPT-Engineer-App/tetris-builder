import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Box display="flex" justifyContent="center" padding={4}>
      <HStack spacing={4}>
        <Button as={Link} to="/">
          Game
        </Button>
        <Button as={Link} to="/instructions">
          Instructions
        </Button>
      </HStack>
    </Box>
  );
};

export default Navigation;
