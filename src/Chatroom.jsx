import React, { useContext } from "react";
import AppContext from "./AppContext";
import ChatWelcome from "./ChatWelcome";

export default function Chatroom(props) {
  const { state, dispatch } = useContext(AppContext);

  const handleLeaveChat = (event) => {
    console.log("Handling Leave Chat");
    dispatch({ type: "LEAVE" });
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
    </div>
  );
}
