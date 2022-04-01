import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import { fetchGroupByUserId } from "../../store/group/group-actions";

import StyledCirclularProgressBar from "../UI/StyledCircularProgress";

import ChatBox from "./ChatBox";

function RecentChats(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const groups = useSelector((state) => state.group.groups);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchGroupByUserId(user.uid, props.addSubscription));
    }
  }, [dispatch, user]);

  const isLoading = !user?.uid;

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
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          overflowY: "auto",
          bgcolor: "primary.light",
          borderRadius: "7px",
        }}
        p={1}
      >
        {isLoading && <StyledCirclularProgressBar />}
        {!isLoading && (
          <>
            {groups.length > 0 ? (
              groups.map((group) => (
                <ChatBox
                  key={group?.id ?? Math.random().toString()}
                  group={group}
                />
              ))
            ) : (
              <Typography
                sx={{ color: "primary.contrastText" }}
                m={1}
                variant="body1"
              >
                No recent chats.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default RecentChats;
