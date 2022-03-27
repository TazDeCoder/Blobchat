import { createContext } from "react";

const AuthContext = createContext({
  uid: "",
  onSignOut: () => {},
  onSignIn: (email, password) => {},
  onSignUp: (email, password, username) => {},
});

export default AuthContext;
