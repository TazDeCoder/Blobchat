import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { Box } from "@mui/material";

import { db, auth } from "../../firebase";

import ChatHeader from "./ChatHeader";
import ChatRoom from "./ChatRoom";
import ChatForm from "./ChatForm";

import StyledCircularProgress from "../UI/StyledCircularProgress";

function Chat(props) {
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages, isMessagesLoading] = useCollectionData(messagesQuery, {
    idField: "id",
  });

  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, orderBy("username"));
  const [users] = useCollectionData(usersQuery, {
    idField: "id",
  });

  const sendMessageHandler = async (newMessage) => {
    await addDoc(messagesRef, {
      text: newMessage.text,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "90%",
        maxWidth: "40rem",
        width: "100%",
        m: "0 auto",
      }}
    >
      {users && <ChatHeader receiver={users[0]} />}
      {isMessagesLoading && <StyledCircularProgress size="8rem" />}
      {messages && <ChatRoom sender={props.sender} messages={messages} />}
      <ChatForm onSendMessage={sendMessageHandler} />
    </Box>
  );
}

export default Chat;
