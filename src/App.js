import { Route, Switch, Redirect } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import { CssBaseline, Box, Button } from "@mui/material";

import { db, auth } from "./firebase";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./components/Chat/Chat";

function App() {
  const [user] = useAuthState(auth);

  const signOutHandler = () => {
    setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        isOnline: false,
      },
      { merge: true }
    ).then(() => auth.signOut());
  };

  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signin" />
        </Route>

        <Route path="/signin">
          {user && <Redirect to="/chat" />}
          <SignIn />
        </Route>

        <Route path="/signup">
          {user && <Redirect to="/chat" />}
          <SignUp />
        </Route>

        <Route path="/chat" exact>
          {!user && <Redirect to="/signin" />}
          {user && (
            <Box sx={{ height: "100vh", bgcolor: "#2c3e50" }}>
              <Chat sender={auth.currentUser.uid} />
              <Button
                sx={{
                  display: "block",
                  margin: "0 auto",
                }}
                variant="outlined"
                color="secondary"
                onClick={signOutHandler}
              >
                Sign Out
              </Button>
            </Box>
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
