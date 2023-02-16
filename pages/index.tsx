import Head from "next/head";
import { Box, HStack, Text, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { UserInterface } from "types/user";
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
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        maxW="1600px"
        overflow="hidden"
        pos="relative"
        height="500px"
        width="100%"
      >
        <Box
          _after={{
            borderRadius: "0 0 100% 50%",
            position: "absolute",
            bg: "linear-gradient(#613AC8,#702CC8)",
            content: '""',
            display: "block",
            borderBottom: "20px solid #DFD3F3",
            w: "100%",
            h: "100%",
          }}
        ></Box>
      </Box>
      <UsersList />
    </>
  );
};

export const UsersList = () => {
  const [users, setUsers] = useState<UserInterface[] | null>();
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
      w="600px"
      borderRadius="24px"
      bg="white"
      pb={10}
      pos="absolute"
      left="50%"
      top="50%"
      transform="translate(-50%, -50%)"
      _after={{
        position: "absolute",
        content: '""',
        w: "100%",
        h: "50%",
        top: "50%",
        left: 0,
        boxShadow: "0 0 30px 4px #e6e6e6",
        borderRadius: "24px",
        zIndex: -1,
      }}
    >
      <Text
        color="#545454"
        fontSize="24px"
        fontWeight="semibold"
        textAlign="center"
        py={10}
        pl={5}
        pr={2}
        bg="#F6F6F6"
        borderRadius="24px 24px 0 0"
      >
        Select an account
      </Text>
      <Box pl={5} pr={2} bg="white">
        <StyledBox overflow="auto" maxH="300px" px={6}>
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
                <Image src={user.profilepicture} borderRadius="50%" w="36px" />
                <Text color="#545454" fontSize="18px">
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
