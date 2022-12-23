import {
  Box,
  Spinner,
  Text,
  SkeletonCircle,
  SkeletonText,
  Divider,
  HStack,
} from "@chakra-ui/react";

export interface LoadingProps {
  message: string;
}

export const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <Box p={6} boxShadow={"lg"} w={"2xl"}>
      <HStack mb={2}>
        <Spinner />
        <Text size={"xs"} textColor={"gray"}>
          {props.message}
        </Text>
      </HStack>
      <Divider />
      <SkeletonCircle size="10" mt={"1"} />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
};
