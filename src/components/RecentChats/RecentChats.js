import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import { fetchGroupByUserId } from "../../store/group/group-actions";

import StyledCirclularProgressBar from "../UI/StyledCircularProgress";

import ChatBox from "./ChatBox";

function RecentChats(props) {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const authId = useSelector((state) => state.auth.id);
  const groups = useSelector((state) => state.group.groups);

  useEffect(() => {
    dispatch(fetchGroupByUserId(authId, props.addSubscription));
  }, [dispatch, authId]);

  setTimeout(() => setIsLoading(false), 1000);

  return (
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
      p={1}
    >
      <Typography variant="h5">Chats</Typography>
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          overflowY: "auto",
          bgcolor: "primary.light",
          borderRadius: "7px",
        }}
        p={1}
      >
        {isLoading && <StyledCirclularProgressBar />}
        {!isLoading && (
          <>
            {groups.length > 0 ? (
              groups.map((group) => <ChatBox key={group.id} group={group} />)
            ) : (
              <Typography
                sx={{ color: "primary.contrastText" }}
                m={1}
                variant="body1"
              >
                No recent chats.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default RecentChats;
