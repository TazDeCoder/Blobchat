import { collection, query, orderBy } from "firebase/firestore";
import { collectionData } from "rxfire/firestore";

import { db } from "../../firebase";

import { messageActions } from "./message-slice";

export const fetchMessagesByGroupId = (groupId, handleSubscription) => {
  return async (dispatch) => {
    const messagesRef = collection(db, "message", groupId, "messages");
    const messagesQuery = query(messagesRef, orderBy("sentAt"));

    const messages$ = collectionData(messagesQuery).subscribe(
      (messagesData) => {
        const transformedMessagesData = messagesData.map((messageData) => {
          return {
            ...messageData,
            sentAt:
              messageData.sentAt !== null
                ? messageData.sentAt.toMillis()
                : null,
          };
        });

        dispatch(messageActions.replaceMessages(transformedMessagesData));
      }
    );

    handleSubscription(messages$);
  };
};
