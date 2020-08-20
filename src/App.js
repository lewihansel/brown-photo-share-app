import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Page/Home";
import Staging from "./components/Page/StagingPage";
import SignUp from "./components/UserAccount/SignUp";
import UserContextProvider from "./context/UserContext";

function App() {
  // useEffect(() => {
  //   projectAuth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log(user);
  //     } else {
  //       console.log(`user logged out`);
  //     }
  //   });
  // });

  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />

          <Route path="/staging" component={Staging} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
