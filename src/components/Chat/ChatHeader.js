import { Box, Avatar, Typography } from "@mui/material";

import StyledBadge from "../UI/StyledBadge";

function getNameInitials(name) {
  const nameInitials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");
  return nameInitials;
}

function ChatHeader(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "40rem",
        width: "100%",
        m: "0 auto",
        p: "0.5rem 1rem",
        bgcolor: "primary.main",
      }}
      component="header"
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        isOnline={props.receiver.isOnline}
      >
        <Avatar>{getNameInitials(props.receiver.username)}</Avatar>
      </StyledBadge>

      <Typography sx={{ color: "primary.contrastText" }} variant="body1">
        {props.receiver.username}
      </Typography>
    </Box>
  );
}

export default ChatHeader;
