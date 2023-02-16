import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { UserInterface } from "types/user";

export interface AuthInterface {
  user: UserInterface | null;
  allUsers: UserInterface[] | null;
  login: (loggedInUser: UserInterface) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [allUsers, setAllUsers] = useState<UserInterface[] | null>([]);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Getting all the users

  useEffect(() => {
    async function fetchData() {
      const userDataResponse = await fetch(
        "https://panorbit.in/api/users.json"
      ).then((res) => res.json());

      setAllUsers(userDataResponse.users);
    }
    fetchData();
  }, []);

  //   login user

  const login = (loggedInUser: UserInterface) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    router.push(`/users/profile/${loggedInUser.id}`);

    toast({
      title: "Log in success !",
      status: "success",
    });
  };

  //   logout user

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");

    toast({
      title: "Log out success !",
      status: "success",
    });
  };

  //   Check user logged in

  const checkUserLoggedIn = () => {
    const userStored = localStorage.getItem("user");

    if (userStored) {
      setUser(JSON.parse(userStored));
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, allUsers, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
