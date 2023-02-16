import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { AuthContext } from "context/userContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserInterface } from "types/user";
import { Layout } from "./Layout";
import Loader from "./Loader";

export const UserProfile = () => {
  const authContextValues = useContext(AuthContext);

  if (!authContextValues) {
    return null;
  }
  const { user, logout } = authContextValues;

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <Layout title="Profile">
        <Text>{user.name} ' profile</Text>
      </Layout>
    </>
  );
};
