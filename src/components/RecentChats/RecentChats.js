import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import { fetchGroupByUserId } from "../../store/group/group-actions";

import ChatBox from "./ChatBox";

function RecentChats() {
  const dispatch = useDispatch();

  const authId = useSelector((state) => state.auth.id);
  const groups = useSelector((state) => state.group.groups);

  useEffect(() => {
    dispatch(fetchGroupByUserId(authId));
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
      p={1}
    >
      <Typography variant="h5">Chats</Typography>
      {groups.length > 0 ? (
        groups.map((group) => <ChatBox key={group.id} group={group} />)
      ) : (
        <Typography variant="body1">No recent chats.</Typography>
      )}
    </Box>
  );
}

export default RecentChats;
