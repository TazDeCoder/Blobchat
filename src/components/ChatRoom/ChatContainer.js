import React from "react";

import { Box, Paper, Typography } from "@mui/material";

import { auth } from "../../firebase";

import StyledCircularProgress from "../UI/StyledCircularProgress";
import ChatMessage from "./ChatMessage";

const ChatContainer = React.forwardRef((props, ref) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        p: "1rem 0.5rem",
        overflow: "auto",
      }}
    >
      {props.loading && <StyledCircularProgress />}
      {!props.loading && (
        <Paper sx={{ alignSelf: "center" }}>
          <Typography variant="body1" p={1}>
            This is the beginning of the chat.
          </Typography>
        </Paper>
      )}
      {!props.loading &&
        props.messages.length > 0 &&
        props.messages.map((message) => {
          return (
            <ChatMessage
              key={message?.id ?? Math.random().toString()}
              isSender={message.senderId === auth.currentUser.uid}
            >
              <Typography
                sx={{ color: "primary.contrastText" }}
                variant="body1"
              >
                {message.text}
              </Typography>
            </ChatMessage>
          );
        })}
      <span ref={ref}></span>
    </Box>
  );
});

export default ChatContainer;
