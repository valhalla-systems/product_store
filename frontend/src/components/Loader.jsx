// components/Loader.jsx
import { Flex, Spinner } from "@chakra-ui/react";

const Loader = ({ size = "80px", color = "blue.500", message }) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      w="full"
      py={20}
      gap={4}
    >
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color={color}
        boxSize={size}
      />
      {message && (
        <span style={{ fontSize: "18px", color: "#555", fontWeight: "500" }}>
          {message}
        </span>
      )}
    </Flex>
  );
};

export default Loader;
