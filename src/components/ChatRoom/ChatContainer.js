import React from "react";

import { useSelector } from "react-redux";

import { Box, Paper, Typography } from "@mui/material";

import { format, isToday } from "date-fns";

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
      <Paper sx={{ alignSelf: "center", mb: "1rem" }}>
        <Typography variant="body1" p={1}>
          This is the beginning of the chat.
        </Typography>
      </Paper>
      {props.messages.length > 0 &&
        props.messages.map((message) => {
          if (message.sentAt === null) return;
          const [localisedDate, localisedTime] = format(
            new Date(message.sentAt),
            "Pp"
          ).split(",");

          const includeDate = !isToday(new Date(message.sentAt));

          return (
            <ChatMessage
              key={Math.random().toString()}
              isSender={message.senderId === userId}
            >
              {includeDate && localisedDate && (
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
                  {localisedDate}
                </Typography>
              )}
              <Typography
                sx={{
                  color: "#fff",
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
