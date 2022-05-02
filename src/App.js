import { useState } from "react";
import "./App.css";

import DemoBanner from "./DemoBanner";
import Chatroom from "./Chatroom";

function App() {
  const [demoBannerDisplayed, setDemoBannerDisplayed] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Hooked On FireChat</h1>{" "}
      </header>
      {demoBannerDisplayed && (
        <DemoBanner onClose={() => setDemoBannerDisplayed(false)} />
      )}
      <div className="chatrooms">
        <Chatroom roomId={3} />
        <Chatroom roomId={3} />
      </div>
    </div>
  );
}

export default App;
