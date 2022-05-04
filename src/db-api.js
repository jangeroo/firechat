import { database as db } from "./firebase.js";

const setUserOnline = ({ roomId, user }) => {
  let ref = db.ref(`${roomId}/users/${user}`);
  ref.child("name").set(user);
  ref.child("status").set("online");
};

const setUpUserDisconnect = ({ roomId, user }) => {
  let ref = db.ref(`${roomId}/users/${user}`);
  ref.child("status").onDisconnect().set("offline");
};

const setUpDisconnectAlert = ({ roomId, user }) => {
  let leftMessageRef = db
    .ref(`${roomId}/messages/${new Date()}/content`)
    .push().key;
  db.ref(`${roomId}/messages/${leftMessageRef}/content`)
    .onDisconnect()
    .set(`${user} just left the room`);
};

const sendMessage = ({ roomId, user, message }) => {
  db.ref(`${roomId}/messages`).push().set({
    user: message.user,
    content: message.content,
  });
};

const alertUserJoined = ({ roomId, user }) => {
  sendMessage({
    roomId,
    user,
    message: { user, content: `${user} just joined the room` },
  });
};

const joinChat = (action) => {
  setUserOnline(action);
  sendMessage({
    ...action,
    message: {
      user: null,
      content: `${action.user} just joined the chat`,
    },
  });
  setUpUserDisconnect(action);
  setUpDisconnectAlert(action);
};

const leaveChat = () => {
  console.log("leaving chat");
  db.goOffline();
};

const api = (action) => {
  console.log("DB MIDDLEWARE");
  console.log({ action });
  switch (action.type) {
    case "JOIN":
      console.log("DB joining chat");
      joinChat(action);
      break;
    default:
      leaveChat(action);
      break;
  }
};
export default api;
