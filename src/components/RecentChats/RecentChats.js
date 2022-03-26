import { collection, query, where } from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { Box, Typography } from "@mui/material";

import { db } from "../../firebase";

import ChatBox from "./ChatBox";

function RecentChats(props) {
  const roomsRef = collection(db, `rooms/users/${props.user.username}`);
  const roomsQuery = query(roomsRef, where("isActive", "==", true));
  const [rooms] = useCollectionData(roomsQuery);

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
      {rooms ? (
        rooms.map((room) => (
          <ChatBox key={Math.random().toString()} title={room.name} />
        ))
      ) : (
        <p>No chats.</p>
      )}
    </Box>
  );
}

export default RecentChats;
