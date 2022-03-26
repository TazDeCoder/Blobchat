import { Box, Paper, Typography } from "@mui/material";

import { auth } from "../../firebase";

import ChatMessage from "./ChatMessage";

import StyledCircularProgress from "../UI/StyledCircularProgress";

function ChatContainer(props) {
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
      {!props.loading && props.messages.length === 0 && (
        <Paper sx={{ alignSelf: "center" }}>
          <Typography variant="body1" p={1}>
            This is the beginning of the conversation
          </Typography>
        </Paper>
      )}
      {!props.loading &&
        props.messages.length > 0 &&
        props.messages.map((message) => {
          return (
            <ChatMessage
              key={message?.id ?? Math.random().toString()}
              isSender={message.uid === auth.currentUser.uid}
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
    </Box>
  );
}

export default ChatContainer;
