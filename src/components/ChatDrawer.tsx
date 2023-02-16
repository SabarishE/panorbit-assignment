import {
  useDisclosure,
  HStack,
  VStack,
  Text,
  Image,
  Box,
  chakra,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { AuthContext } from "context/userContext";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { StyledBox } from "components/Layout";
import { ChatRight } from "@emotion-icons/bootstrap/ChatRight";
import { ChevronUp } from "@emotion-icons/bootstrap/ChevronUp";
import { ChevronDown } from "@emotion-icons/bootstrap/ChevronDown";
import { Close } from "@emotion-icons/evaicons-solid/Close";
import { Send } from "@emotion-icons/boxicons-solid/Send";

export const ChatDrawer = () => {
  const [selectedUser, setSelectedUser] = useState("");

  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { user, allUsers, logout } = authContextValues;

  if (!allUsers) {
    return <Loader />;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isUserChatOpen,
    onOpen: onUserChatOpen,
    onClose: onUserChatClose,
  } = useDisclosure();

  return (
    <Box maxW="1400px" mx="auto" position="relative" right="0" bg="pink">
      <HStack
        pos="absolute"
        right="0"
        bottom="0"
        spacing={10}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        {isUserChatOpen && (
          <UserChatDrawer onClose={onUserChatClose} user={selectedUser} />
        )}
        <VStack maxH="350px" w="250px" borderRadius="8px 8px 0 0" spacing={0}>
          <HStack
            bg="#2C65C8"
            color="white"
            w="100%"
            minH="50px"
            borderRadius="8px 8px 0 0"
            px={4}
            justifyContent="space-between"
            cursor="pointer"
            onClick={() => (isOpen ? onClose() : onOpen())}
          >
            <Text fontSize="18px">
              {" "}
              <ChatRight color="white" size="24px" />
              <chakra.span px={4}>Chats</chakra.span>
            </Text>
            <chakra.span>
              {isOpen ? (
                <ChevronUp color="white" size="18px" />
              ) : (
                <ChevronDown color="white" size="18px" />
              )}
            </chakra.span>
          </HStack>

          <Box border="1px solid #2C65C8" pr={2}>
            {isOpen && (
              <StyledBox overflow="auto" maxH="250px" px={2}>
                {allUsers.map((userData, index) => {
                  return (
                    <HStack
                      key={userData.id}
                      alignItems="center"
                      py={1}
                      px={2}
                      cursor="pointer"
                      justifyContent="center"
                      onClick={() => {
                        if (index % 2 === 0) {
                          setSelectedUser(userData.name);
                          onUserChatOpen();
                        }
                      }}
                    >
                      <Image
                        src={userData.profilepicture}
                        borderRadius="50%"
                        w="32px"
                      />
                      <Text
                        color="#545454"
                        fontSize="14px"
                        textAlign="left"
                        flex="1"
                      >
                        {userData.name}
                      </Text>
                      <chakra.span
                        minW="9px"
                        minH="9px"
                        borderRadius="50%"
                        bg={index % 2 === 0 ? "#1FAE66" : "#d8d8d8"}
                      />
                    </HStack>
                  );
                })}
              </StyledBox>
            )}
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

const sampleChat = [
  { address: "me", message: "hello" },
  { address: "other", message: "world abcd efg hij klm nopq" },
  { address: "me", message: "hello" },
];

const UserChatDrawer = ({
  onClose,
  user,
}: {
  onClose: () => void;
  user: string;
}) => {
  const [chat, setChat] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sampleChat.push({ address: "me", message: chat });

    setTimeout(() => {
      var chatBlock = document.getElementById("chatBlock") as HTMLElement;
      chatBlock.scrollTop = chatBlock.scrollHeight;
    }, 100);

    setChat("");
  };

  return (
    <VStack maxH="200px" w="250px" borderRadius="8px 8px 0 0" spacing={0}>
      <HStack
        bg="#2C65C8"
        color="white"
        w="100%"
        minH="50px"
        borderRadius="8px 8px 0 0"
        px={4}
        justifyContent="space-between"
      >
        <Text fontSize="18px">
          <chakra.span px={4}>user</chakra.span>
        </Text>
        <chakra.span onClick={onClose} cursor="pointer">
          <Close color="white" size="18px" />
        </chakra.span>
      </HStack>

      <Box border="1px solid #2C65C8" pr={2} pos="relative">
        <StyledBox
          overflow="auto"
          maxH="100px"
          w="100%"
          px={4}
          mb="50px"
          id="chatBlock"
        >
          {sampleChat.map((chat) => {
            const isMyChat = chat.address === "me";
            return (
              <Box
                pos="relative"
                right={isMyChat ? "-50%" : "none"}
                left={!isMyChat ? "0" : "none"}
                my={1}
                bg="#F1F1F1"
                maxW="50%"
                borderRadius="4px"
                pl={1}
              >
                {chat.message}
              </Box>
            );
          })}
        </StyledBox>
        <form onSubmit={handleSubmit}>
          <InputGroup pos="absolute" bottom="0" left="0" right="0" w="100%">
            <Input
              type="text"
              placeholder="type here..."
              _focus={{}}
              border="none"
              outline="none"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <IconButton
              aria-label="chat-submit"
              type="submit"
              icon={<Send color="#2C65C8" size="24px" />}
            />
          </InputGroup>
        </form>
      </Box>
    </VStack>
  );
};
