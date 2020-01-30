import React, { useState } from "react";
import "./App.css";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import Homepage from "./components/Home";
import User from "./components/User";

function App() {
  const [isLogin, setLogin] = useState(false);

  // Authentication handle
  const Auth = () => {
    setLogin(true);
  };

  // Handle Login direct
  const LoginRoute = ({ children }) => {
    return (
      <Route
        render={() =>
          isLogin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage auth={Auth} />
        </Route>
        <LoginRoute exact path="/user">
          <User />
        </LoginRoute>
      </Switch>
    </Router>
  );
}
export default App;
