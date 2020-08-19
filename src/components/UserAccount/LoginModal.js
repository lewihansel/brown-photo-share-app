import React from "react";
import { IoIosPerson, IoMdKey } from "react-icons/io";

const LoginModal = () => {
  return (
    <div className="loginModal">
      <span>Log In to your Account</span>
      <form>
        <div className="inputForm">
          <IoIosPerson />
          <input required type="email" placeholder="email" />
        </div>

        <div className="inputForm">
          <IoMdKey />
          <input required type="password" placeholder="password" />
        </div>
        <button className="modalButton">Login</button>
      </form>
    </div>
  );
};

export default LoginModal;
