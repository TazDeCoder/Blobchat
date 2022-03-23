import { Route, Redirect, Switch } from "react-router-dom";

import { doc } from "firebase/firestore";

import { useDocumentData } from "react-firebase-hooks/firestore";

import { db } from "../../firebase";

import Profile from "./pages/Profile";
import Chats from "./pages/Chats";

function HomeLayout(props) {
  const [user] = useDocumentData(doc(db, "users", props.user.uid));

  return (
    <Switch>
      <Route path="/home" exact>
        <Redirect to="/home/chats" />
      </Route>

      <Route path="/home/profile" exact>
        {user && <Profile user={user} />}
      </Route>

      <Route path="/home/chats">{user && <Chats user={user} />}</Route>
    </Switch>
  );
}

export default HomeLayout;
