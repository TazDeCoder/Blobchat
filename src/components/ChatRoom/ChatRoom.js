import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { fetchUsersByGroup, saveMessage } from "../../utils";

import { fetchMessagesByGroupId } from "../../store/message/message-actions";

import { fetchGroupById } from "../../store/group/group-actions";

import StyledCircularProgress from "../UI/StyledCircularProgress";

import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";

function ChatRoom(props) {
  const params = useParams();

  const chatRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const group = useSelector((state) => state.group.currentGroup);
  const messages = useSelector((state) => state.message.messages);

  const [recipient, setRecipient] = useState({});

  const isLoading =
    Object.keys(recipient).length === 0 || messages.length === 0;

  useEffect(() => {
    dispatch(fetchMessagesByGroupId(params.groupId, props.addSubscription));
    dispatch(fetchGroupById(params.groupId));
  }, [dispatch, params.groupId]);

  const fetchRecipients = useCallback(async () => {
    if (!group || !user) return;
    const fetchedRecipients = await fetchUsersByGroup(group);
    const filteredRecipients = fetchedRecipients.filter(
      (recipient) => recipient.uid !== user.uid
    );
    setRecipient(...filteredRecipients);
  }, [group, user]);

  useEffect(() => {
    fetchRecipients();
  }, [fetchRecipients]);

  const sendMessageHandler = async (msgText) => {
    if (!msgText.trim()) return;

    await saveMessage(msgText, params.groupId, user.uid);

    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        height: {
          sm: "100vh",
        },
      }}
    >
      {isLoading && <StyledCircularProgress />}
      {!isLoading && (
        <>
          <ChatHeader receiver={recipient} />
          <ChatContainer ref={chatRef} messages={messages} />
          <ChatForm onSendMessage={sendMessageHandler} />
        </>
      )}
    </Box>
  );
}

export default ChatRoom;
