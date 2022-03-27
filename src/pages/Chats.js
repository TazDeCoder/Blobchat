import { Route, Routes } from "react-router-dom";

import { Grid } from "@mui/material";

import Blank from "../components/Blank/Blank";
import MainSidebar from "../components/MainSidebar/MainSidebar";
import RecentChats from "../components/RecentChats/RecentChats";
import ChatRoom from "../components/ChatRoom/ChatRoom";

function Chats() {
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
      <Grid item xs="auto" sm={6} md={4}>
        <>
          <MainSidebar />
          <RecentChats />
        </>
      </Grid>

      <Grid item xs="auto" sm={6} md={8}>
        <Blank />

        <Routes>
          <Route path="/home/chats/users/:username" element={<ChatRoom />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default Chats;
