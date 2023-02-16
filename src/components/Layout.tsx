import {
  HStack,
  VStack,
  Text,
  Image,
  SimpleGrid,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AuthContext } from "context/userContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserInterface } from "types/user";
import Loader from "./Loader";
import { ChevronRight } from "@emotion-icons/entypo/ChevronRight";
import { ChatDrawer } from "components/ChatDrawer";

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

export const Layout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { user, allUsers, logout } = authContextValues;

  if (!user || !allUsers) {
    return <Loader />;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SimpleGrid
        templateColumns="0.2fr 0.8fr"
        maxW="1400px"
        minH="90vh"
        h="100%"
        my={10}
        mx="auto"
        spacing={10}
        pos="relative"
      >
        <MenuBar userId={user.id} />
        <VStack alignItems="stretch">
          <LayoutHeader title={title} user={user} />
          {children}
        </VStack>
      </SimpleGrid>
      <ChatDrawer />
    </>
  );
};

const LayoutHeader = ({
  title,
  user,
}: {
  title: string;
  user: UserInterface;
}) => {
  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }

  const { allUsers, login, logout } = authContextValues;

  if (!allUsers) {
    return <Loader />;
  }

  return (
    <HStack
      py={4}
      justifyContent="space-between"
      borderBottom="1px solid #A5A6E4"
    >
      <Text fontWeight="semibold" fontSize="20px" color="#545454">
        {title}
      </Text>
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
                  <Image
                    src={user.profilepicture}
                    borderRadius="50%"
                    w="32px"
                  />
                  <Text
                    color="#545454"
                    fontSize="14px"
                    textAlign="left"
                    flex="1"
                  >
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
    </HStack>
  );
};

const MenuBar = ({ userId }: { userId?: number }) => {
  const router = useRouter();
  return (
    <VStack
      h="100%"
      borderRadius="24px"
      spacing={0}
      alignItems="stretch"
      justifyContent="center"
      fontSize="18px"
      fontWeight="semibold"
      color="white"
      bg="linear-gradient(#613AC8 70%,#702CC8)"
    >
      <MenuLink
        href={`/users/profile/${userId}`}
        menu="Profile"
        isActive={router.pathname.includes("/profile")}
      />
      <MenuLink
        href={`/users/posts/${userId}`}
        menu="Posts"
        isActive={router.pathname.includes("/posts")}
      />
      <MenuLink
        href={`/users/gallery/${userId}`}
        menu="Gallery"
        isActive={router.pathname.includes("/gallery")}
      />
      <MenuLink
        href={`/users/todo/${userId}`}
        menu="Todo"
        border={false}
        isActive={router.pathname.includes("/todo")}
      />
    </VStack>
  );
};

const MenuLink = ({
  href,
  menu,
  border,
  isActive,
}: {
  href: string;
  menu: string;
  border?: boolean;
  isActive: boolean;
}) => {
  return (
    <Box pos="relative">
      <Link href={href}>
        <Text
          cursor="pointer"
          color={isActive ? "#FFFFFF" : "#A5A6E4"}
          _hover={{ color: "#FFFFFF" }}
          borderBottom={border === false ? "" : "1px solid #A5A6E4"}
          py={4}
          mx={10}
        >
          {menu}
        </Text>
      </Link>
      <Box
        pos="absolute"
        top="2.5"
        right="0"
        display={isActive ? "inline-block" : "none"}
        h="65%"
        w="35px"
        bg="white"
        py={1}
        pl={3}
        borderRadius="70% 0 0 70%"
      >
        {isActive && <ActiveMenuCurveyEdges />}

        <ChevronRight size="20px" color="#BDC5D4" />
      </Box>
    </Box>
  );
};

const ActiveMenuCurveyEdges = () => {
  return (
    <>
      <chakra.span
        position="absolute"
        top="100%"
        right="0"
        h="25%"
        w="100%"
        bg="white"
        _after={{
          content: '""',
          pos: "absolute",
          top: "0",
          right: "0",
          borderRadius: "0 60% 0  0",
          width: "100%",
          height: "100%",
          background: "linear-gradient(#613AC8 70%,#702CC8)",
          color: "black",
        }}
      ></chakra.span>
      <chakra.span
        position="absolute"
        bottom="100%"
        right="0"
        h="25%"
        w="100%"
        bg="white"
        _after={{
          content: '""',
          pos: "absolute",
          top: "0",
          right: "0",
          borderRadius: "0 0 60%  0",
          width: "100%",
          height: "100%",
          background: "linear-gradient(#613AC8 70%,#702CC8)",
          color: "black",
        }}
      ></chakra.span>
    </>
  );
};
