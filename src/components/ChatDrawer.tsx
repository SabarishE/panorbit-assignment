import {
  useDisclosure,
  HStack,
  VStack,
  Text,
  Image,
  Box,
  chakra,
  InputGroup,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { AuthContext } from "context/userContext";
import { FormEvent, useContext, useState } from "react";
import Loader from "components/Loader";
import { StyledBox } from "components/layout/Layout";
import { ChatRight } from "@emotion-icons/bootstrap/ChatRight";
import { ChevronUp } from "@emotion-icons/bootstrap/ChevronUp";
import { ChevronDown } from "@emotion-icons/bootstrap/ChevronDown";
import { Close } from "@emotion-icons/evaicons-solid/Close";
import { Send } from "@emotion-icons/boxicons-solid/Send";
import { UserInterface } from "types/user";

export const ChatDrawer = () => {
  const [selectedUser, setSelectedUser] = useState<UserInterface>();

  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { allUsers } = authContextValues;

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
        <VStack
          maxH="350px"
          w="250px"
          borderRadius="8px 8px 0 0"
          spacing={0}
          bg="white"
        >
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
                <ChevronDown color="white" size="18px" />
              ) : (
                <ChevronUp color="white" size="18px" />
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
                          setSelectedUser(userData);
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
  user?: UserInterface;
}) => {
  const [chat, setChat] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sampleChat.push({ address: "me", message: chat });

    // Scrolling the chat window to bottom after sending a message
    // inside a timeout function so that scrolling will happen only after chat message is added to chat array

    setTimeout(() => {
      var chatBlock = document.getElementById("chatBlock") as HTMLElement;
      chatBlock.scrollTop = chatBlock.scrollHeight;
    }, 100);

    setChat("");
  };

  return (
    <VStack
      maxH="250px"
      w="250px"
      borderRadius="8px 8px 0 0"
      spacing={0}
      bg="white"
    >
      <HStack
        bg="#2C65C8"
        color="white"
        w="100%"
        minH="50px"
        borderRadius="8px 8px 0 0"
        px={4}
        justifyContent="space-between"
      >
        <HStack fontSize="16px">
          <Image src={user?.profilepicture} w="24px" borderRadius="50%" />
          <chakra.span>{user?.name}</chakra.span>
        </HStack>
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
          {sampleChat.map((chat, index) => {
            const isMyChat = chat.address === "me";
            return (
              <Box
                key={index}
                pos="relative"
                right={isMyChat ? "-50%" : "none"}
                left={!isMyChat ? "0" : "none"}
                my={1}
                bg="#d8d8d8"
                maxW="50%"
                borderRadius="8px"
                pl={1}
              >
                {chat.message}
              </Box>
            );
          })}
        </StyledBox>
        <form onSubmit={handleSubmit}>
          <InputGroup
            pos="absolute"
            bottom="0"
            left="0"
            right="0"
            w="100%"
            _focus={{ outline: "none" }}
            _active={{}}
            border="none"
            outline="none"
            borderTop="1px solid #2C65C8"
          >
            <Input
              type="text"
              placeholder="type here..."
              _focus={{ outline: "none" }}
              _active={{}}
              border="none"
              outline="none"
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <IconButton
              aria-label="chat-submit"
              type="submit"
              icon={<Send color="#2C65C8" size="24px" />}
              bg="transparent"
              _hover={{}}
              _active={{}}
            />
          </InputGroup>
        </form>
      </Box>
    </VStack>
  );
};
