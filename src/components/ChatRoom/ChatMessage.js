import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";

const ChatMessage = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isSender",
})(({ theme, isSender }) => ({
  maxWidth: "15rem",
  width: "60%",
  margin: "0.5rem",
  padding: "0.5rem",
  overflowWrap: "break-word",
  backgroundColor: `${theme.palette.primary.light}`,
  borderRadius: "7px",
  ...(isSender && {
    alignSelf: "end",
    textAlign: "right",
    backgroundColor: `${theme.palette.secondary.light}`,
  }),
}));

export default ChatMessage;
