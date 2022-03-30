import { Box, Typography } from "@mui/material";

function Blank(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h6" component="p" align="center" p={1} my={2}>
        {props?.title ?? ""}
      </Typography>

      <Typography variant="body1" align="center">
        Type in the searchbar to find a user to chat to
      </Typography>
    </Box>
  );
}

export default Blank;
