import { Box, Text } from "@chakra-ui/react";

export const CommingSoon = () => {
  return (
    <Box w="100%" h="100%" pos="relative">
      <Text
        color="#EEEEEE"
        pos="absolute"
        fontSize={["20px", "75px"]}
        fontWeight="bold"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        textAlign="center"
      >
        Comming Soon
      </Text>
    </Box>
  );
};
