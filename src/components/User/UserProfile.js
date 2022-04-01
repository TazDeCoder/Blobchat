import { useSelector } from "react-redux";

import { Box, Typography, Container, Avatar } from "@mui/material";

import { stringAvatar } from "../../utils";

import StyledBadge from "../UI/StyledBadge";

function UserProfile() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container
      sx={{
        maxWidth: "90%",
        width: "40rem",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          bgcolor: "primary.dark",
          border: "2px solid",
          borderColor: "primary.light",
          borderRadius: "7px",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h5" component="h1" p={1} my={2}>
          User Profile
        </Typography>

        {user && (
          <>
            <Typography variant="h5" component="p">
              {user.username}
            </Typography>

            <StyledBadge
              sx={{ margin: "1rem 0" }}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              isOnline={user.isOnline}
            >
              <Avatar
                {...stringAvatar(user.username)}
                sx={{ width: 76, height: 76 }}
              />
            </StyledBadge>

            <Typography variant="body1" my={2}>
              Email: {user.email}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}

export default UserProfile;
