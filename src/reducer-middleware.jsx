import React from "react";

const useReducerWithMiddleware = (reducer, initialState, middlewareFn) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const dispatchWithMiddleware = (action) => {
    middlewareFn(action);
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};

export default useReducerWithMiddleware;
