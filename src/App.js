import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Page/Home";
import Staging from "./components/Page/StagingPage";
import SignUp from "./components/UserAccount/SignUp";
import UserContextProvider from "./context/UserContext";
import GridContextProvider from "./context/GridContext";

function App() {
  return (
    <UserContextProvider>
      <GridContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />

            <Route path="/staging" component={Staging} />
          </Switch>
        </Router>
      </GridContextProvider>
    </UserContextProvider>
  );
}

export default App;
