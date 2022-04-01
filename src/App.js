import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import useSubscriptions from "./hooks/use-subscriptions";

import { initAuth } from "./store/auth/auth-actions";

import Fallback from "./pages/Fallback";
import SignIn from "./pages/SignIn";

const SignUp = React.lazy(() => import("./pages/SignUp"));
const Chats = React.lazy(() => import("./pages/Chats"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3b3b98",
      light: "#6262ac",
      dark: "#29296a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fc427b",
      light: "#fc6795",
      dark: "#b02e56",
      contrastText: "#000",
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
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Navigate to={entryPath} />} />

          <Route path="/auth" element={<Navigate to="/auth/signin" />} />

          <Route
            path="/auth/signin"
            element={<SignIn addSubscription={addSubscription} />}
          />
          <Route
            path="/auth/signup"
            element={<SignUp addSubscription={addSubscription} />}
          />

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
