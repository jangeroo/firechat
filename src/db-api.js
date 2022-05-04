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

const sendMessage = ({ roomId, user, content }) => {
  db.ref(`${roomId}/messages`).push().set({ user, content });
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
  cleanupPreviousAlerts(action);
  sendMessage({
    ...action,
    user: null,
    content: `${action.user} just joined the chat`,
  });
  setUpUserDisconnect(action);
  setUpDisconnectAlert(action);
};

const leaveChat = () => {
  console.log("leaving chat");
  db.goOffline();
};

const monitorMessages = ({ roomId, dispatch }) => {
  db.ref(`${roomId}/messages`).on("child_added", (message) => {
    console.log('messages.on("child_added"):');
    console.log({ message: message.val() });
    dispatch({ type: "MESSAGE_ADDED", message: message.val() });
  });
};

const cleanupPreviousAlerts = ({ roomId, dispatch }) => {
  dispatch({ type: "CLEANUP_ALERTS", roomId });
};

const api = (action) => {
  console.log(`DB MIDDLEWARE - action: ${action.type}`);
  console.log({ action });

  switch (action.type) {
    case "MONITOR_MESSAGES":
      monitorMessages(action);
      break;
    case "JOIN":
      console.log("DB joining chat");
      joinChat(action);
      break;
    case "LEAVE":
      leaveChat(action);
      break;
    case "SEND_MESSAGE":
      sendMessage(action);
      break;
    case "MESSAGE_ADDED":
    case "CLEANUP_ALERTS":
      // intentionally do nothing here.
      break;
    default:
      console.log(`ERROR in DB MIDDLEWARE - Unknown action: ${action.type}`);
      break;
  }
};
export default api;
