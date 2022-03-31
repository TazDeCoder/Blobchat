import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import { initAuth } from "./store/auth/auth-actions";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route path="/auth" element={<Navigate to="/auth/signin" />} />

        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route path="/home" element={<Navigate to="/home/chats" />} />

        <Route path="/home/chats/*" element={<Chats />} />
        <Route path="/home/profile" element={<Profile />} />

        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
