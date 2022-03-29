import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

import { groupActions } from "./group-slice";

export const createGroup = (userArray, createdBy, name = null, type = 1) => {
  return async (dispatch) => {
    const group = {
      createdAt: serverTimestamp(),
      members: userArray,
      createdBy,
      name,
      type,
    };

    const groupRef = collection(db, "group");

    const newGroupRef = await addDoc(groupRef, group);

    const updatedGroupRef = await setDoc(
      newGroupRef,
      {
        id: newGroupRef.id,
      },
      { merge: true }
    );

    const updatedGroupSnap = await getDoc(updatedGroupRef);

    const updatedGroupData = {
      ...updatedGroupSnap.data(),
      createdAt: updatedGroupSnap.data().createdAt.valueOf(),
    };

    dispatch(groupActions.replaceCurrentGroup(updatedGroupData));
  };
};

export const fetchGroupByUserId = (uid) => {
  return async (dispatch) => {
    const groupRef = collection(db, "group");
    const groupQuery = query(groupRef, where("members", "array-contains", uid));
    const groupSnap = await getDocs(groupQuery);
    const groupData = groupSnap.docs.map((groupSnap) => {
      return {
        ...groupSnap.data(),
        createdAt: groupSnap.data().createdAt.valueOf(),
      };
    });

    dispatch(groupActions.replaceGroups(groupData));
  };
};

export const fetchGroupById = (groupId) => {
  return async (dispatch) => {
    const groupRef = doc(db, "group", groupId);
    const groupSnap = await getDoc(groupRef);
    const groupData = {
      ...groupSnap.data(),
      createdAt: groupSnap.data().createdAt.valueOf(),
    };

    dispatch(groupActions.replaceCurrentGroup(groupData));
  };
};
