import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { initAuth } from "../store/auth/auth-actions";

import StyledCircularProgress from "../components/UI/StyledCircularProgress";

import Blank from "../components/Blank/Blank";
import MainSidebar from "../components/MainSidebar/MainSidebar";
import UserProfile from "../components/User/UserProfile";

function Profile() {
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state.auth.authenticated);

  const isLoading = !authenticated;

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

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
        <MainSidebar />
        <Blank />
      </Grid>

      <Grid sx={{ position: "relative" }} item xs="auto" sm={6} md={8}>
        {isLoading && <StyledCircularProgress />}
        {authenticated && <UserProfile />}
      </Grid>
    </Grid>
  );
}

export default Profile;
