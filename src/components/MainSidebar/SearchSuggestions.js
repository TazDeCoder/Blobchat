import { Link as RouterLink } from "react-router-dom";

import { Box, Paper, Stack, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",

  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#ccc" : "#484d52",
  },
}));

function SearchSuggestions(props) {
  return (
    <Box sx={{ width: "100%", p: 1, bgcolor: "primary.dark" }}>
      <Stack spacing={2}>
        {props.suggestions.map((suggestion) => (
          <Item key={suggestion.id}>
            <Link
              component={RouterLink}
              to={`/home/chats/users/${suggestion.text}`}
              color="inherit"
              underline="none"
              onClick={props.onClick}
            >
              {suggestion.text}
            </Link>
          </Item>
        ))}
      </Stack>
    </Box>
  );
}

export default SearchSuggestions;
