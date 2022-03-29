import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

import { updateGroup } from "../../utils";

import { messageActions } from "./message-slice";

export const saveMessage = (messageText, currentGroupId, sentBy) => {
  return async (dispatch) => {
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
      sentAt: messageSnap.data().sentAt.valueOf(),
    };

    dispatch(messageActions.addNewMessage(messageData));

    updateGroup(currentGroupId, {
      recentMessage: messageData,
    });
  };
};

export const fetchMessagesByGroupId = (groupId) => {
  return async (dispatch) => {
    const messagesRef = collection(db, "message", groupId, "messages");
    const messagesQuery = query(messagesRef, orderBy("sentAt"));
    const messagesSnap = await getDocs(messagesQuery);
    const messagesData = messagesSnap.docs.map((messageSnap) => {
      return {
        ...messageSnap.data(),
        sentAt: messageSnap.data().sentAt.valueOf(),
      };
    });

    dispatch(messageActions.replaceMessages(messagesData));
  };
};
