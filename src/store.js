import api from "./api";

const initialState = {
  currentUser: null,
  messages: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "JOIN":
      console.log(`DISPATCHED: JOIN - ${action.user} to room${action.roomId}`);
      api.joinChat(action.user, action.roomId);
      return { ...state, currentUser: action.user };

    default:
      return state;
  }
};

export { reducer, initialState };
