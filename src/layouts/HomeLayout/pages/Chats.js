import { Route, Switch } from "react-router-dom";

import { Grid } from "@mui/material";

import MainSidebar from "../../../components/MainSidebar/MainSidebar";
import Blank from "../../../components/Blank/Blank";
import ChatRoom from "../../../components/ChatRoom/ChatRoom";
import RecentChats from "../../../components/RecentChats/RecentChats";

function Chats(props) {
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
        {props.user.username && (
          <>
            <MainSidebar user={props.user} />
            <RecentChats user={props.user} />
          </>
        )}
      </Grid>

      <Grid item xs="auto" sm={6} md={8}>
        <Switch>
          <Route path="/home/chats" exact>
            <Blank />
          </Route>

          <Route path="/home/chats/users/:username">
            <ChatRoom user={props.user} />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}

export default Chats;
