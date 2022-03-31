import React from "react";

import { useSelector } from "react-redux";

import { Box, Paper, Typography } from "@mui/material";

import { format } from "date-fns";

import ChatMessage from "./ChatMessage";

const ChatContainer = React.forwardRef((props, ref) => {
  const userId = useSelector((state) => state.user.currentUser.uid);

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        p: "1rem 0.5rem",
        overflowY: "auto",
        bgcolor: "primary.main",
      }}
    >
      <Paper sx={{ alignSelf: "center" }}>
        <Typography variant="body1" p={1}>
          This is the beginning of the chat.
        </Typography>
      </Paper>
      {props.messages.length > 0 &&
        props.messages.map((message) => {
          const localisedTime =
            message.sentAt !== null
              ? format(new Date(message.sentAt), "p")
              : "";

          return (
            <ChatMessage
              key={Math.random().toString()}
              isSender={message.senderId === userId}
            >
              <Typography
                sx={{
                  color: `${
                    message.senderId === userId
                      ? "secondary.contrastText"
                      : "primary.contrastText"
                  }`,
                }}
                variant="body1"
              >
                {message.text}
              </Typography>
              <Typography
                sx={{
                  color: "text.disabled",
                  textAlign: `${
                    message.senderId === userId ? "right" : "left"
                  }`,
                }}
                mt={1}
                variant="body2"
              >
                {localisedTime}
              </Typography>
            </ChatMessage>
          );
        })}
      <span ref={ref}></span>
    </Box>
  );
});

export default ChatContainer;
