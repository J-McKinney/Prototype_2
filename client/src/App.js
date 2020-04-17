import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/LandingPage/Landing";
import Dictaphone from "./components/SpeechRecognition/SpeechRecognition";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/game" component={Dictaphone} />
      </Switch>
    </Router>
  );
}

export default App;
