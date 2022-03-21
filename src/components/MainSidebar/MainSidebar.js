import { useState } from "react";

import {
  collection,
  doc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { Box } from "@mui/material";

import { db, auth } from "../../firebase";

import SearchAppBar from "../UI/SearchAppBar";
import SearchSuggestions from "./SearchSuggestions";

function MainSidebar(props) {
  const [enteredSearchTerm, setEnteredSearchTerm] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);

  const usersRef = collection(db, "users");
  const usersQuery = query(
    usersRef,
    where("username", "!=", props.user.username),
    orderBy("username"),
    limit(10)
  );
  const [users] = useCollectionData(usersQuery);

  const signOutHandler = () => {
    setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        isOnline: false,
      },
      { merge: true }
    ).then(() => auth.signOut());
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
      .map((user) => {
        return {
          id: Math.random().toString(),
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
        onLogout={signOutHandler}
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
