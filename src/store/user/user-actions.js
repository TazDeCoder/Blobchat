import { collection, getDocs, getDoc, doc, query } from "firebase/firestore";

import { db } from "../../firebase";

import { userActions } from "./user-slice";

export const fetchUsers = () => {
  return async (dispatch) => {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef);
    const usersSnap = await getDocs(usersQuery);
    const usersData = usersSnap.docs.map((userSnap) => userSnap.data());

    dispatch(userActions.replaceUsers(usersData));
  };
};

export const getUserFromFirestore = (uid) => {
  return async (dispatch) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    dispatch(userActions.replaceCurrentUser(userData));
  };
};
