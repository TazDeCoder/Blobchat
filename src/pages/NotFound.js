import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Typography, Container, Box } from "@mui/material";

import StyledCircularProgress from "../components/UI/StyledCircularProgress";

function NotFound() {
  const navigate = useNavigate();

  const authenticated = useSelector((state) => state.auth.authenticated);

  setTimeout(() => {
    if (authenticated) navigate("/home");
    else navigate("/auth");
  }, 3000);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <Typography variant="h3" component="h1">
        Page Not Found!
      </Typography>
      <Typography m={2} variant="h5" component="h2">
        You'll be redirected very shortly!
      </Typography>
      <Box
        sx={{ position: "relative", paddingRight: "10rem", margin: "1rem 0" }}
      >
        <StyledCircularProgress />
      </Box>
    </Container>
  );
}

export default NotFound;
