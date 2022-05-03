import { database as db } from "./firebase.js";

const setUserOnline = (user, roomId) => {
  let ref = db.ref(`${roomId}/users/${user}`);
  ref.child("name").set(user);
  ref.child("status").set("online");
};

const setUpUserDisconnect = (user, roomId) => {
  let ref = db.ref(`${roomId}/users/${user}`);
  ref.child("status").onDisconnect().set("offline");
};

const api = {
  joinChat: (user, roomId) => {
    setUserOnline(user, roomId);
    setUpUserDisconnect(user, roomId);
  },
};

export default api;
