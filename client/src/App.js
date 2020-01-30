import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./components/Home";
import User from "./components/User";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/user">
          <User />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
