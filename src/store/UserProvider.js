import { useCallback, useEffect, useContext, useState } from "react";

import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase";

import UserContext from "./user-context";
import AuthContext from "./auth-context";

function UserProvider(props) {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const fetchUserDetail = useCallback(async () => {
    const userRef = doc(db, `users/${auth.uid}`);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    setUsername(userData.username);
    setIsOnline(userData.isOnline);
  }, [auth.uid]);

  useEffect(() => {
    if (auth?.uid) fetchUserDetail();
  }, [auth.uid, fetchUserDetail]);

  const fetchUserChats = async () => {
    const roomsRef = collection(db, `rooms/users/${username}`);
    const roomsQuery = query(roomsRef, where("isActive", "==", true));
    const roomsSnap = await getDocs(roomsQuery);
    const roomsData = roomsSnap.docs.map((roomSnap) => roomSnap.data());
    return roomsData;
  };

  const fetchUsers = async () => {
    const usersRef = collection(db, "users");
    const usersQuery = query(
      usersRef,
      where("username", "!=", username),
      orderBy("username"),
      limit(10)
    );
    const usersSnap = await getDocs(usersQuery);
    const usersData = usersSnap.docs.map((userSnap) => userSnap.data());
    return usersData;
  };

  const userContext = {
    username,
    isOnline,
    getChats: fetchUserChats,
    getUsers: fetchUsers,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
