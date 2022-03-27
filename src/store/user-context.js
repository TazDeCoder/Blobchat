import { createContext } from "react";

const UserContext = createContext({
  username: "",
  isOnline: false,
  getChats: () => {},
  getUsers: () => {},
});

export default UserContext;
