import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

import StyledCircularProgress from "../components/UI/StyledCircularProgress";

import MainSidebar from "../components/MainSidebar/MainSidebar";
import UserProfile from "../components/User/UserProfile";

function Profile() {
  const authenticated = useSelector((state) => state.auth.authenticated);

  const isLoading = !authenticated;

  return (
    <Grid
      sx={{
        flexWrap: "nowrap",
        width: "100%",
        height: {
          xs: "100vh",
        },
        overflow: "hidden",
      }}
      container
      direction={{
        xs: "column",
      }}
      spacing={{ xs: 2 }}
    >
      <Grid item xs="auto">
        <MainSidebar />
      </Grid>

      <Grid sx={{ position: "relative" }} item xs="auto">
        {isLoading && <StyledCircularProgress />}
        {authenticated && <UserProfile />}
      </Grid>
    </Grid>
  );
}

export default Profile;
