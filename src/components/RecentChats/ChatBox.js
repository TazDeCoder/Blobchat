import { Link as RouterLink } from "react-router-dom";

import { Box, Avatar, Typography, Link } from "@mui/material";

import { stringAvatar } from "../../helpers";

function ChatBox(props) {
  return (
    <Link
      component={RouterLink}
      to={`/home/chats/users/${props.title}`}
      color="inherit"
      underline="none"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#c3ede7",
          borderRadius: "9px",
        }}
        p={1}
        my={1}
      >
        <Avatar {...stringAvatar(props.title)} />
        <Typography variant="body2" mx={1}>
          {props.title}
        </Typography>
      </Box>
    </Link>
  );
}

export default ChatBox;
