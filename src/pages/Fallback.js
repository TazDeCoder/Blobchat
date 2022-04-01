import { Typography, Container, Box } from "@mui/material";

import StyledCircularProgress from "../components/UI/StyledCircularProgress";

function Fallback() {
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
        Page is loading...
      </Typography>
      <Box
        sx={{ position: "relative", paddingRight: "10rem", margin: "1rem 0" }}
      >
        <StyledCircularProgress />
      </Box>
    </Container>
  );
}

export default Fallback;
