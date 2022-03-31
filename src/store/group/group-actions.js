import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { collectionData } from "rxfire/firestore";

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
      createdAt: updatedGroupSnap.data().createdAt.toMillis(),
    };

    dispatch(groupActions.replaceCurrentGroup(updatedGroupData));
  };
};

export const fetchGroupByUserId = (uid, handleSubscription) => {
  return async (dispatch) => {
    const groupRef = collection(db, "group");
    const groupQuery = query(groupRef, where("members", "array-contains", uid));
    const group$ = collectionData(groupQuery).subscribe((groupsData) => {
      const transformedGroupsData = groupsData.map((groupData) => {
        return {
          ...groupData,
          createdAt: groupData.createdAt.toMillis(),
        };
      });

      dispatch(groupActions.replaceGroups(transformedGroupsData));
    });

    handleSubscription(group$);
  };
};

export const fetchGroupById = (groupId) => {
  return async (dispatch) => {
    const groupRef = doc(db, "group", groupId);
    const groupSnap = await getDoc(groupRef);
    const groupData = {
      ...groupSnap.data(),
      createdAt: groupSnap.data().createdAt.toMillis(),
    };

    dispatch(groupActions.replaceCurrentGroup(groupData));
  };
};
