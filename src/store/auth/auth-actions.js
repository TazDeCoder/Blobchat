import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { db, auth } from "../../firebase";

import { authActions } from "./auth-slice";
import { getUserFromFirestore } from "../user/user-actions";

export const initAuth = () => {
  return (dispatch) => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch(authActions.initAuth(authUser.uid));
      dispatch(getUserFromFirestore(authUser.uid));
      unsubscribe();
    });
  };
};

export const signInUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await setDoc(
        doc(db, "users", user.uid),
        {
          isOnline: true,
        },
        { merge: true }
      );

      dispatch(authActions.signInSuccess(user.uid));
    } catch (err) {
      console.log(err.message);
      dispatch(authActions.signInError(err));
    }
  };
};

export const signUpUser = (email, password, username) => {
  return async (dispatch) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        groups: [],
        uid: user.uid,
        isOnline: true,
      });

      dispatch(authActions.signInSuccess(user.uid));
    } catch (err) {
      throw err;
    }
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      {
        isOnline: false,
      },
      { merge: true }
    );
    await auth.signOut();

    dispatch(authActions.signOutSuccess());
  };
};
