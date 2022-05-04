const tempMessages = [
  { user: "michael", content: "__fromState__ aloha amigos" },
  { user: "betsy", content: "__fromState__ hey friend" },
  { content: "someone just joined or left" },
  { user: "michael", content: "__fromState__ what's shakin', bacon?" },
];

const initialState = {
  currentUser: null,
  messages: tempMessages,
};

const reducer = (state, action) => {
  console.log(`REDUCER - action: ${action.type}`);
  console.log({ action });

  let messages;

  switch (action.type) {
    case "JOIN":
      return { ...state, currentUser: action.user };
    case "LEAVE":
      return { ...state, currentUser: null };
    case "MESSAGE_ADDED":
      messages = state.messages.concat(action.message);
      return { ...state, messages };
    case "CLEANUP_ALERTS":
      messages = state.messages.filter((message) => message.user);
      return { ...state, messages };
    case "SEND_MESSAGE":
      // intentionally do nothing here
      return state;
    default:
      console.log(`ERROR in REDUCER - Unknown action: ${action.type}`);
      return state;
  }
};

export { reducer, initialState };
