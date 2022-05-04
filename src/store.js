const initialState = {
  currentUser: null,
  messages: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "JOIN":
      console.log(`DISPATCHED: JOIN - ${action.user} to room${action.roomId}`);
      return { ...state, currentUser: action.user };

    case "LEAVE":
      console.log(`DISPATCHED: LEAVE`);
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export { reducer, initialState };
