import { Route, Redirect, Switch } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function AuthLayout() {
  return (
    <Switch>
      <Route path="/auth" exact>
        <Redirect to="/auth/signin" />
      </Route>

      <Route path="/auth/signin" exact>
        <SignIn />
      </Route>

      <Route path="/auth/signup" exact>
        <SignUp />
      </Route>
    </Switch>
  );
}

export default AuthLayout;
