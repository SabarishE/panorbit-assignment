import { UserProfile } from "components/UserProfile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserInterface } from "types/user";

const UserAccountPage = () => {
  const router = useRouter();

  const userId = router.query.id as string;

  return <UserProfile />;
};

export default UserAccountPage;
