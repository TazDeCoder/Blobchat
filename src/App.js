import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import useSubscriptions from "./hooks/use-subscriptions";

import { initAuth } from "./store/auth/auth-actions";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      disabled: "#d5d5d5",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state.auth.authenticated);

  const { addSubscription, removeSubscriptions } = useSubscriptions();

  useEffect(() => {
    dispatch(initAuth(addSubscription));
  }, [dispatch]);

  const entryPath = authenticated ? "/home" : "/auth";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to={entryPath} />} />

        <Route path="/auth" element={<Navigate to="/auth/signin" />} />

        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route path="/home" element={<Navigate to="/home/chats" />} />

        <Route
          path="/home/chats/*"
          element={
            <Chats
              addSubscription={addSubscription}
              removeSubscriptions={removeSubscriptions}
            />
          }
        />
        <Route path="/home/profile" element={<Profile />} />

        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
