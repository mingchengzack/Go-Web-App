import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ToDoList from "./components/ToDoList";
import Homepage from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/user" component={ToDoList}></Route>
      </Switch>
    </Router>
  );
}
export default App;
