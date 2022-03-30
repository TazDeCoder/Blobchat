import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

function UserProfile() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <Typography variant="h5" component="h1" align="center" p={1} my={1}>
        User Profile
      </Typography>

      {user && (
        <>
          <Typography variant="body1" align="center" my={2}>
            Username: {user.username}
          </Typography>

          <Typography variant="body1" align="center">
            Email: {user.email}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default UserProfile;
