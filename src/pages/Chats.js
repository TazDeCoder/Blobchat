import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Grid } from "@mui/material";

import { initAuth } from "../store/auth/auth-actions";

import StyledCircularProgress from "../components/UI/StyledCircularProgress";

import Blank from "../components/Blank/Blank";
import MainSidebar from "../components/MainSidebar/MainSidebar";
import RecentChats from "../components/RecentChats/RecentChats";
import ChatRoom from "../components/ChatRoom/ChatRoom";

function Chats() {
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state.auth.authenticated);

  const isLoading = !authenticated;

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return (
    <Grid
      sx={{
        flexWrap: "nowrap",
        width: "100%",
        height: {
          xs: "100vh",
          sm: "initial",
        },
        overflow: "hidden",
      }}
      container
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={{ xs: 2, md: 3 }}
    >
      <Grid sx={{ position: "relative" }} item xs="auto" sm={6} md={4}>
        {isLoading && <StyledCircularProgress />}
        {authenticated && (
          <>
            <MainSidebar />
            <RecentChats />
          </>
        )}
      </Grid>

      <Grid item xs="auto" sm={6} md={8}>
        <Routes>
          <Route path=":groupId" element={<ChatRoom />} />
          <Route path="*" element={<Blank title={"Welcome to Blobchat!"} />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default Chats;
