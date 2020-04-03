import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dictaphone from "./pages/SpeechRecognition/Dictaphone";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dictaphone} />
      </Switch>
    </Router>
  );
}

export default App;
