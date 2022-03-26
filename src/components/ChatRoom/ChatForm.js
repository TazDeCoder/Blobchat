import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <TextField
          sx={{
            width: "90%",
            maxHeight: "6rem",
            overflow: "auto",
          }}
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
      </Box>
    </form>
  );
}

export default ChatForm;
