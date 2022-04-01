import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import { signOutUser } from "../../store/auth/auth-actions";
import { fetchUsers } from "../../store/user/user-actions";

import SearchAppBar from "../UI/SearchAppBar";
import SearchSuggestions from "./SearchSuggestions";

function MainSidebar(props) {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const user = useSelector((state) => state.user.currentUser);

  const [enteredSearchTerm, setEnteredSearchTerm] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(signOutUser());
    props.removeSubscriptions();
  };

  const clearSuggestionsHandler = () => {
    setEnteredSearchTerm("");
    setSearchTerms([]);
  };

  const searchTermChangedHandler = (e) => {
    setEnteredSearchTerm(e.target.value);

    if (!e.target.value) {
      setSearchTerms([]);
      return;
    }

    const filteredTerms = users
      .filter((u) => u.uid !== user.uid)
      .map((user) => {
        return {
          id: user.uid,
          text: user.username,
        };
      })
      .filter((searchTerm) =>
        searchTerm.text.toLowerCase().startsWith(e.target.value.toLowerCase())
      );

    setSearchTerms(filteredTerms);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchAppBar
        value={enteredSearchTerm}
        placeholder={"Find a User..."}
        onChange={searchTermChangedHandler}
        profileUrl={"/home/profile"}
        chatUrl={"/home/chats"}
        logoutUrl={"/auth"}
        onLogout={logoutHandler}
      />
      {searchTerms.length > 0 && (
        <SearchSuggestions
          suggestions={searchTerms}
          onClick={clearSuggestionsHandler}
        />
      )}
    </Box>
  );
}

export default MainSidebar;
