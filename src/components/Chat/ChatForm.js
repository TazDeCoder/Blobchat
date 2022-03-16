import { useState } from "react";

import { Container, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatForm(props) {
  const [enteredMessage, setEnteredMessage] = useState("");

  const messageChangedHandler = (e) => {
    setEnteredMessage(e.target.value);
  };

  const sendHandler = (e) => {
    e.preventDefault();
    // Create message data object
    const messageData = {
      id: Math.random().toString(),
      text: enteredMessage,
      isUser: true,
    };
    // Handle message data
    props.onSendMessage(messageData);
    // Clear input field
    setEnteredMessage("");
  };

  return (
    <form onSubmit={sendHandler}>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-end",
          maxWidth: "40rem",
          width: "100%",
          p: 2,
          bgcolor: "secondary.light",
        }}
      >
        <TextField
          sx={{
            width: "90%",
            maxHeight: "6rem",
            overflow: "auto",
            bgcolor: "secondary.light",
          }}
          InputProps={{
            sx: {
              color: "secondary.contrastText",
            },
          }}
          color="secondary"
          value={enteredMessage}
          multiline
          onChange={messageChangedHandler}
        />

        <Button
          sx={{ m: 1 }}
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Send
        </Button>
      </Container>
    </form>
  );
}

export default ChatForm;
