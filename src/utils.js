import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import stc from "string-to-color";

import { db } from "./firebase";

function getNameInitials(name) {
  const nameInitials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");
  return nameInitials;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stc(name),
    },
    children: getNameInitials(name),
  };
}

export async function fetchUsersByGroup(group) {
  let membersData = [];

  for (const member of group.members) {
    const userRef = doc(db, "users", member);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    membersData.push(userData);
  }

  return membersData;
}

export async function updateGroup(groupId, data) {
  const groupRef = doc(db, "group", groupId);
  await setDoc(
    groupRef,
    {
      ...data,
    },
    {
      merge: true,
    }
  );
}

export async function filterGroup(userArray, type = 1) {
  const groupRef = collection(db, "group");
  const groupQuery = query(
    groupRef,
    where("members", "in", [userArray]),
    where("type", "==", type)
  );
  const groupsSnap = await getDocs(groupQuery);
  const groupsData = groupsSnap.docs.map((groupSnap) => groupSnap.data());

  return groupsData;
}

export async function saveMessage(messageText, currentGroupId, sentBy) {
  const message = {
    text: messageText,
    sentAt: serverTimestamp(),
    senderId: sentBy,
  };
  const messagesRef = collection(db, "message", currentGroupId, "messages");
  const messageRef = await addDoc(messagesRef, message);
  const messageSnap = await getDoc(messageRef);
  const messageData = {
    ...messageSnap.data(),
    sentAt: messageSnap.data().sentAt.toMillis(),
  };

  updateGroup(currentGroupId, {
    recentMessage: messageData,
  });
}
