const initialState = {
  currentUser: null,
  messages: [],
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
