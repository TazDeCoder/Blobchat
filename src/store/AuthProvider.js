import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import { db, auth } from "../firebase";

import AuthContext from "./auth-context";

function AuthProvider(props) {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const signOutHandler = () => {
    setDoc(
      doc(db, "users", user.uid),
      {
        isOnline: false,
      },
      { merge: true }
    )
      .then(() => auth.signOut())
      .then(() => navigate("/auth"));
  };

  const signInHandler = async (email, password) => {
    try {
      const { user: userCredential } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(
        doc(db, "users", userCredential.uid),
        {
          isOnline: true,
        },
        { merge: true }
      );
      navigate("/home");
    } catch (err) {
      throw err;
    }
  };

  const signUpHandler = async (email, password, username) => {
    try {
      const { user: userCredential } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.uid), {
        username,
        isOnline: true,
      });
      navigate("/home");
    } catch (err) {
      throw err;
    }
  };

  const authContext = {
    uid: user?.uid,
    onSignOut: signOutHandler,
    onSignIn: signInHandler,
    onSignUp: signUpHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
