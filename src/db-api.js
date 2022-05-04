import { database as db } from "./firebase.js";

const setUserStatus = ({ roomId, user }, status) => {
  let ref = db.ref(`${roomId}/users/${user}`);
  ref.child("name").set(user);
  ref.child("status").set(status);
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

const alertUserConnection = ({ roomId, user }, status) => {
  sendMessage({
    roomId,
    user: null,
    content: `${user} just ${status} the room`,
  });
};

const joinChat = (action) => {
  setUserStatus(action, "online");
  cleanupPreviousAlerts(action);
  alertUserConnection(action, "joined");
  setUpUserDisconnect(action);
  setUpDisconnectAlert(action);
};

const leaveChat = (action) => {
  setUserStatus(action, "offline");
  alertUserConnection(action, "left");
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
