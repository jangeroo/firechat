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

  switch (action.type) {
    case "JOIN":
      return { ...state, currentUser: action.user };

    case "LEAVE":
      console.log(`DISPATCHED: LEAVE`);
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export { reducer, initialState };
