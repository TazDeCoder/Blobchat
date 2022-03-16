import { Container, Typography } from "@mui/material";

import ChatMessage from "./ChatMessage";

function ChatRoom(props) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "95%",
        width: "40rem",
        height: "60%",
        overflow: "auto",
        bgcolor: "secondary.main",
      }}
    >
      {props.messages.map((message) => {
        return (
          <ChatMessage key={message.id} isUser={message.isUser}>
            <Typography sx={{ color: "primary.contrastText" }} variant="body1">
              {message.text}
            </Typography>
          </ChatMessage>
        );
      })}
    </Container>
  );
}

export default ChatRoom;
