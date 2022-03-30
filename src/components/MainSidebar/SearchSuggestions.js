import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { filterGroup } from "../../utils";

import { groupActions } from "../../store/group/group-slice";
import { createGroup } from "../../store/group/group-actions";

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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const group = useSelector((state) => state.group.currentGroup);

  const suggestionClickHandler = async (recipientId) => {
    const userArray = [recipientId, user.uid];
    const [foundGroup] = await filterGroup(userArray);

    if (!foundGroup) {
      dispatch(createGroup(userArray, user.uid));
    } else {
      dispatch(
        groupActions.replaceCurrentGroup({
          ...foundGroup,
          createdAt: foundGroup.createdAt.valueOf(),
        })
      );
    }

    navigate(`/home/chats/${group.id}`);
    props.onClick();
  };

  return (
    <Box sx={{ width: "100%", p: 1, bgcolor: "primary.dark" }}>
      <Stack spacing={2}>
        {props.suggestions.map((suggestion) => (
          <Item
            key={suggestion.id}
            onClick={suggestionClickHandler.bind(null, suggestion.id)}
          >
            {suggestion.text}
          </Item>
        ))}
      </Stack>
    </Box>
  );
}

export default SearchSuggestions;
