import { Box, Avatar, Typography } from "@mui/material";

import { stringAvatar } from "../../utils";

import StyledBadge from "../UI/StyledBadge";

function ChatHeader(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "primary.light",
      }}
      py={1}
      px={2}
      component="header"
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        isOnline={props.receiver.isOnline}
      >
        <Avatar {...stringAvatar(props.receiver.username)} />
      </StyledBadge>

      <Typography sx={{ color: "primary.contrastText" }} variant="body1">
        {props.receiver.username}
      </Typography>
    </Box>
  );
}

export default ChatHeader;
