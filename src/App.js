import { useState } from "react";
import "./App.css";
import AppContext from "./AppContext";
import useReducerWithMiddleware from "./reducer-middleware";
import { reducer, initialState } from "./store.js";
import dbMiddleware from "./db-api";

import DemoBanner from "./DemoBanner";
import Chatroom from "./Chatroom";

function App() {
  const [demoBannerDisplayed, setDemoBannerDisplayed] = useState(true);
  const [state, dispatch] = useReducerWithMiddleware(
    reducer,
    initialState,
    dbMiddleware
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Hooked On FireChat</h1>
        </header>

        {demoBannerDisplayed && (
          <DemoBanner onClose={() => setDemoBannerDisplayed(false)} />
        )}

        <div className="chatrooms">
          <Chatroom roomId={3} />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
