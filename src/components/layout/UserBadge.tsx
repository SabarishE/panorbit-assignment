import {
  HStack,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { AuthContext } from "context/userContext";
import { useContext } from "react";
import { UserInterface } from "types/user";
import { StyledBox } from "components/layout/Layout";
import Loader from "components/Loader";

export const UserBadge = ({ user }: { user: UserInterface }) => {
  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }

  const { allUsers, login, logout } = authContextValues;

  if (!allUsers) {
    return <Loader />;
  }

  return (
    <Menu>
      <MenuButton>
        <HStack spacing={4}>
          <Image src={user.profilepicture} borderRadius="50%" w="36px" />
          <Text color="#4A4A4A" fontSize="18px">
            {user.name}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList
        borderRadius="32px"
        p={5}
        boxShadow=" 0px 7px 29px 0px rgba(100, 100, 111, 0.2)"
      >
        <Image
          src={user.profilepicture}
          borderRadius="50%"
          w="100px"
          display="block"
          mx="auto"
        />
        <Text textAlign="center" fontSize="18px" pt={4}>
          {user.name}
        </Text>
        <Text color="#9A9A9A" textAlign="center" pb={2}>
          {user.email}
        </Text>
        <StyledBox overflow="auto" maxH="150px" px={2}>
          {allUsers.map((user, index) => {
            return (
              <HStack
                key={user.id}
                alignItems="center"
                py={3}
                px={4}
                borderTop="1px solid #D5D5D5"
                onClick={() => login(user)}
                cursor="pointer"
                justifyContent="center"
              >
                <Image src={user.profilepicture} borderRadius="50%" w="32px" />
                <Text color="#545454" fontSize="14px" textAlign="left" flex="1">
                  {user.name}
                </Text>
              </HStack>
            );
          })}
        </StyledBox>
        <Button
          borderRadius="20px"
          onClick={logout}
          bg="#D55151"
          color="white"
          display="block"
          mx="auto"
          mt={4}
          _hover={{}}
        >
          Sign out
        </Button>
      </MenuList>
    </Menu>
  );
};
