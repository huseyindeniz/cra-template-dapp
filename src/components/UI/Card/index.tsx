import { Flex, Box, useColorModeValue } from "@chakra-ui/react";

export interface CardProps {
  children?: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Flex p={2} w="full" h={"full"} alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        maxW={"md"}
        h={"full"}
      >
        {children}
      </Box>
    </Flex>
  );
};
