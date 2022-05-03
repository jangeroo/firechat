import React, { useContext } from "react";
import AppContext from "./AppContext";
import ChatWelcome from "./ChatWelcome";

export default function Chatroom(props) {
  const { state, dispatch } = useContext(AppContext);
  if (!state.currentUser) return <ChatWelcome roomId={props.roomId} />;
  return <div>Chatroom</div>;
}
