import React, { createRef, useContext } from "react";
import styled from "styled-components";
import AppContext from "./AppContext.js";

export default function ChatWelcome(props) {
  const { state, dispatch } = useContext(AppContext);
  const usernameInputRef = createRef();

  const handleJoinChat = (event) => {
    event.preventDefault();
    let user = usernameInputRef.current.value;
    console.log(`${user} is joining chat`);
    dispatch({ type: "JOIN", user, roomId: props.roomId });
  };

  return (
    <WelcomeWrapper>
      <h3>Enter your name to join the chat</h3>
      <div>
        <form onSubmit={handleJoinChat}>
          <input type="text" ref={usernameInputRef} />
          <button>Join chat</button>
        </form>
      </div>
    </WelcomeWrapper>
  );
}

const WelcomeWrapper = styled.div``;
