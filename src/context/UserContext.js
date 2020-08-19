import React, { createContext, useState, useEffect } from "react";
import { projectAuth } from "../config/firebase";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    projectAuth.onAuthStateChanged((usr) => {
      setUser(usr);
    });
  });

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
