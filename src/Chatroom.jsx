import React, { useContext } from "react";
import AppContext from "./AppContext";

export default function Chatroom() {
  const { state, dispatch } = useContext(AppContext);
  if (!state.currentUser) return <div>Welcome Room</div>;
  return <div>Chatroom</div>;
}
