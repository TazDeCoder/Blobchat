import { Grid } from "@mui/material";

import MainSidebar from "../components/MainSidebar/MainSidebar";
import UserProfile from "../components/User/UserProfile";

function Profile(props) {
  return (
    <Grid
      sx={{
        flexWrap: "nowrap",
        width: "100%",
        height: {
          xs: "100vh",
          sm: "initial",
        },
        overflow: "hidden",
      }}
      container
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={{ xs: 2, md: 3 }}
    >
      <Grid item xs="auto" sm={6} md={4}>
        <MainSidebar user={props.user} />
      </Grid>

      <Grid item xs="auto" sm={6} md={8}>
        <UserProfile user={props.user} />
      </Grid>
    </Grid>
  );
}

export default Profile;
