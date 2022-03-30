import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { fetchUsersByGroup } from "../../utils";

import {
  fetchMessagesByGroupId,
  saveMessage,
} from "../../store/message/message-actions";

import { fetchGroupById } from "../../store/group/group-actions";

import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";

function ChatRoom() {
  const params = useParams();

  const chatRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const group = useSelector((state) => state.group.currentGroup);
  const messages = useSelector((state) => state.message.messages);

  const [recipient, setRecipient] = useState({});

  useEffect(() => {
    dispatch(fetchMessagesByGroupId(params.groupId));
    dispatch(fetchGroupById(params.groupId));
  }, [dispatch]);

  useEffect(async () => {
    if (group && user) {
      const fetchedRecipients = await fetchUsersByGroup(group);
      const filteredRecipients = fetchedRecipients.filter(
        (recipient) => recipient.uid !== user.uid
      );
      setRecipient(...filteredRecipients);
    }
  }, [group, user, fetchUsersByGroup]);

  const sendMessageHandler = (msgText) => {
    if (!msgText.trim()) return;

    dispatch(saveMessage(msgText, params.groupId, user.uid));
  };

  useEffect(() => {
    if (messages) {
      chatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

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
      {Object.keys(recipient).length > 0 && <ChatHeader receiver={recipient} />}
      <ChatContainer ref={chatRef} loading={false} messages={messages} />
      <ChatForm onSendMessage={sendMessageHandler} />
    </Box>
  );
}

export default ChatRoom;
