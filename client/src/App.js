import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import ToDoList from "./components/ToDoList";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div>
      {/* <Container>
        <ToDoList />
      </Container> */}
      <Homepage />
    </div>
  );
}
export default App;
