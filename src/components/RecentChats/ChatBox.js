import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Avatar, Typography } from "@mui/material";

import { stringAvatar, fetchUsersByGroup } from "../../utils";

import { fetchGroupById } from "../../store/group/group-actions";

import StyledBadge from "../UI/StyledBadge";

function ChatBox(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [recipient, setRecipient] = useState({});

  const user = useSelector((state) => state.user.currentUser);

  useEffect(async () => {
    if (user) {
      const fetchedRecipients = await fetchUsersByGroup(props.group);
      const filteredRecipients = fetchedRecipients.filter(
        (recipient) => recipient.uid !== user.uid
      );
      setRecipient(...filteredRecipients);
    }
  }, [props.group, user, fetchUsersByGroup]);

  const chatClickedHandler = () => {
    dispatch(fetchGroupById(props.group.id));

    navigate(`/home/chats/${props.group.id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "primary.light",
        borderRadius: "9px",
        cursor: "pointer",
      }}
      p={1}
      my={1}
      onClick={chatClickedHandler}
    >
      {Object.keys(recipient).length > 0 && (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          isOnline={recipient.isOnline}
        >
          <Avatar {...stringAvatar(recipient.username)} />
        </StyledBadge>
      )}
      <Typography variant="body1" mx={1} color={"text.secondary"}>
        {props.group.recentMessage?.text ?? "No recent messages"}
      </Typography>
    </Box>
  );
}

export default ChatBox;
