import { doc } from "firebase/firestore";

import { useDocumentData } from "react-firebase-hooks/firestore";

import { Box, Typography } from "@mui/material";

import { db, auth } from "../../firebase";

function UserProfile() {
  const userRef = doc(db, `users/${auth.currentUser.uid}`);
  const [user] = useDocumentData(userRef);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      {user && (
        <>
          <Typography variant="h6" component="p" align="center" p={1} my={2}>
            {user.username}
          </Typography>

          <Typography variant="body1" align="center">
            STATUS: {user.isOnline ? "ONLINE" : "OFFLINE"}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default UserProfile;
