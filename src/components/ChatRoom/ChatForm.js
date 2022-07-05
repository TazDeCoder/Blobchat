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
    const messageData = enteredMessage;
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
          bgcolor: "primary.light",
        }}
        p={2}
      >
        <TextField
          sx={{
            maxWidth: "30rem",
            width: "90%",
            maxHeight: "6rem",
            overflow: "auto",
            borderRadius: "5px",
            bgcolor: "#fff",
          }}
          color="primary"
          value={enteredMessage}
          multiline
          onChange={messageChangedHandler}
          onFocus={() => props.onToggleIsTyping(true)}
          onBlur={() => props.onToggleIsTyping(false)}
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
