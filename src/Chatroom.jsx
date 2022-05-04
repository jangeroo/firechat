import React, { createRef, useContext, useEffect } from "react";
import AppContext from "./AppContext";
import ChatWelcome from "./ChatWelcome";
import styled from "styled-components";

export default function Chatroom(props) {
  const { state, dispatch } = useContext(AppContext);
  const messageInputRef = createRef();

  useEffect(() => {
    dispatch({ type: "MONITOR_MESSAGES", roomId: props.roomId, dispatch });
  }, []);

  const handleLeaveChat = (event) => {
    console.log("Handling Leave Chat");
    dispatch({ type: "LEAVE" });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    console.log("<Chatroom> sendMessage()");

    const roomId = props.roomId;
    const user = state.currentUser;
    const content = messageInputRef.current.value;
    messageInputRef.current.value = "";

    dispatch({ type: "SEND_MESSAGE", roomId, user, content });
  };

  const renderMessage = (message, i) => {
    if (!message.user)
      return (
        <Message key={i}>
          <em>...{message.content}...</em>
        </Message>
      );
    return (
      <Message key={i}>
        <b>{message.user}:</b> {message.content}
      </Message>
    );
  };

  if (!state.currentUser) return <ChatWelcome roomId={props.roomId} />;
  return (
    <div className="chatroom">
      <h3 className="container">
        <span className="left main">
          Welcome <strong>{state.currentUser}</strong>! Start chatting :)
        </span>
        <button onClick={handleLeaveChat}>Leave Chat</button>
      </h3>
      <form onSubmit={sendMessage}>
        <input type="text" ref={messageInputRef} required />
        <button>Send Message</button>
      </form>
      <MessageList className="message-window">
        {state.messages.map(renderMessage)}
      </MessageList>
    </div>
  );
}

const MessageList = styled.ol`
  list-style: none;
  text-align: left;
`;

const Message = styled.li``;
