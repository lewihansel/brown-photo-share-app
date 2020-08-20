import React, { useState } from "react";
import { IoIosPerson, IoMdKey } from "react-icons/io";
import { projectAuth } from "../../config/firebase";

const LoginModal = ({ setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    projectAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setModalOpen(false);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(`${err.code} : ${err.message}`);
      });
  };

  return (
    <div className="loginModal">
      <span>Log In to your Account</span>
      <form onSubmit={handleLogin}>
        <div className="inputForm">
          <IoIosPerson />
          <input
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="inputForm">
          <IoMdKey />
          <input
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="modalButton">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
