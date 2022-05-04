import React, { useContext } from "react";
import AppContext from "./AppContext";
import ChatWelcome from "./ChatWelcome";
import styled from "styled-components";

export default function Chatroom(props) {
  const { state, dispatch } = useContext(AppContext);

  const handleLeaveChat = (event) => {
    console.log("Handling Leave Chat");
    dispatch({ type: "LEAVE" });
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
