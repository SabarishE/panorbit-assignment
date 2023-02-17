import { Box, HStack, Text, Image } from "@chakra-ui/react";
import { useContext } from "react";
import styled from "@emotion/styled";
import { AuthContext } from "context/userContext";
import Loader from "components/Loader";

export const StyledBox = styled(Box)`
  ::-webkit-scrollbar {
    width: 7px;
    height: 8px;
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    border: 10px solid transparent;
    border-radius: 25px;
    margin-top: 25px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    height: "25px";
    border-radius: 50px;
  }
`;

const Home = () => {
  return (
    <>
      <Box maxW="1600px" pos="relative">
        <Box display={["none", null, "block"]}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 650">
            <path
              fill="#613AC8"
              fillOpacity="1"
              d="M0,288L48,240C96,192,192,96,288,96C384,96,480,192,576,224C672,256,768,224,864,197.3C960,171,1056,149,1152,170.7C1248,192,1344,256,1392,288L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </Box>
        <UsersList />
      </Box>
    </>
  );
};

export const UsersList = () => {
  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { allUsers, login } = authContextValues;

  if (!allUsers) {
    return <Loader />;
  }

  return (
    <Box
      w={["300px", null, "600px"]}
      borderRadius="24px"
      bg="white"
      pb={10}
      pos="absolute"
      left="50%"
      top="50%"
      transform="translate(-50%, -50%)"
      boxShadow=" 0px 7px 29px 0px rgba(100, 100, 111, 0.2)"
    >
      <Text
        color="#545454"
        fontSize="24px"
        fontWeight="semibold"
        textAlign="center"
        py={[5, null, 10]}
        pl={[2, null, 5]}
        pr={2}
        bg="#F6F6F6"
        borderRadius="24px 24px 0 0"
      >
        Select an account
      </Text>
      <Box pl={5} pr={2} bg="white">
        <StyledBox overflow="auto" maxH="400px" px={[4, null, 6]}>
          {allUsers.map((user, index) => {
            return (
              <HStack
                key={user.id}
                alignItems="center"
                py={3}
                borderBottom="1px solid #D5D5D5"
                spacing={4}
                onClick={() => login(user)}
                cursor="pointer"
              >
                <Image
                  src={user.profilepicture}
                  borderRadius="50%"
                  w={["24px", null, "36px"]}
                />
                <Text color="#545454" fontSize={["14px", null, "18px"]}>
                  {user.name}
                </Text>
              </HStack>
            );
          })}
        </StyledBox>
      </Box>
    </Box>
  );
};

export default Home;
