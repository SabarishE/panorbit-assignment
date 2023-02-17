import { VStack, Text, Box, chakra } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRight } from "@emotion-icons/entypo/ChevronRight";

export const MenuBar = ({ userId }: { userId?: number }) => {
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
