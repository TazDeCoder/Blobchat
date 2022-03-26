import { useParams } from "react-router-dom";

import {
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { Box } from "@mui/material";

import { db, auth } from "../../firebase";

import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";

function ChatRoom(props) {
  const params = useParams();

  const roomName = `chat_${
    props.user.username < params.username
      ? `${props.user.username}_${params.username}`
      : `${params.username}_${props.user.username}`
  }`;

  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("username", "==", params.username));
  const [recipient] = useCollectionData(usersQuery);

  const messagesRef = collection(
    db,
    `rooms/users/${props.user.username}/${roomName}/messages`
  );
  const messagesQuery = query(messagesRef, orderBy("createdAt"));
  const [messages, isMessagesLoading] = useCollectionData(messagesQuery, {
    idField: "id",
  });

  const sendMessageHandler = async (newMessage) => {
    if (messages.length === 0) {
      const chatsRef = doc(db, `rooms/users/${props.user.username}`, roomName);
      await setDoc(chatsRef, {
        isActive: true,
      });

      const chatsRef2 = doc(db, `rooms/users/${params.username}`, roomName);
      await setDoc(chatsRef2, {
        name: params.username,
        isActive: true,
      });
    }

    await addDoc(messagesRef, {
      text: newMessage.text,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
    });

    const messagesRef2 = collection(
      db,
      `rooms/users/${params.username}/${roomName}/messages`
    );

    await addDoc(messagesRef2, {
      text: newMessage.text,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        height: {
          sm: "100vh",
        },
      }}
    >
      {recipient && <ChatHeader receiver={recipient[0]} />}
      <ChatContainer loading={isMessagesLoading} messages={messages} />
      <ChatForm onSendMessage={sendMessageHandler} />
    </Box>
  );
}

export default ChatRoom;
