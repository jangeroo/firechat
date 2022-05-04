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
    dispatch({ type: "LEAVE", user: state.currentUser, roomId: props.roomId });
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
    const style = {
      color: message.user === state.currentUser ? "blue" : "inherit",
    };
    if (!message.user)
      return (
        <Message key={i}>
          <em>...{message.content}...</em>
        </Message>
      );
    return (
      <Message key={i}>
        <b style={style}>{message.user}:</b> {message.content}
      </Message>
    );
  };

  if (!state.currentUser) return <ChatWelcome roomId={props.roomId} />;
  return (
    <ChatroomWrapper>
      <Header>
        <span>
          Welcome <strong>{state.currentUser}</strong>! Start chatting :)
        </span>
        <button onClick={handleLeaveChat}>Leave Chat</button>
      </Header>
      <MessageList className="message-window">
        {state.messages.map(renderMessage)}
      </MessageList>
      <Form onSubmit={sendMessage}>
        <input type="text" ref={messageInputRef} required />
        <button>Send</button>
      </Form>
    </ChatroomWrapper>
  );
}

const ChatroomWrapper = styled.div`
  margin: auto;
  width: 75%;
  max-width: 500px;
  text-align: left;
`;

const Header = styled.h3`
  display: flex;

  span {
    flex-grow: 1;
  }
`;

const Form = styled.form`
  display: flex;

  input {
    flex-grow: 1;
  }
`;

const MessageList = styled.div`
  position: relative;
  margin: 10px;
  overflow-y: auto;
  max-height: 400px;
  color: black;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  margin: 5px 0px;
`;
