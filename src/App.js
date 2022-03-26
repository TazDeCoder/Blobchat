import { Route, Switch, Redirect } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import CssBaseline from "@mui/material/CssBaseline";

import { auth } from "./firebase";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";

let renderCount = 0;

function App() {
  renderCount++;
  console.log(renderCount);

  const [user] = useAuthState(auth);

  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>

        <Route path="/auth">
          {user && <Redirect to="/home" />}
          <AuthLayout />
        </Route>

        <Route path="/home">
          {!user && <Redirect to="/auth" />}
          {user && <HomeLayout user={user} />}
        </Route>

        <Route path="*">
          <h1>Not Found!</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
