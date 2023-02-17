import {
  HStack,
  VStack,
  Text,
  SimpleGrid,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { AuthContext } from "context/userContext";
import { useContext } from "react";
import { UserInterface } from "types/user";
import Loader from "components/Loader";
import { ChatDrawer } from "components/ChatDrawer";
import { MenuBar } from "components/layout/MenuBar";
import { UserBadge } from "components/layout/UserBadge";

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
  const { user, allUsers } = authContextValues;

  if (!user || !allUsers) {
    return <Loader />;
  }

  const isMobile = useBreakpointValue({ base: true, md: false });

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
        {!isMobile && <MenuBar userId={user.id} />}

        <VStack alignItems="stretch" spacing={10}>
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
  return (
    <HStack
      py={4}
      justifyContent="space-between"
      borderBottom="1px solid #A5A6E4"
    >
      <Text fontWeight="semibold" fontSize="20px" color="#545454">
        {title}
      </Text>
      <UserBadge user={user} />
    </HStack>
  );
};
