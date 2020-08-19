import React, { useState } from "react";
import { IoIosMail, IoMdKey, IoMdPerson } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import {
  projectAuth,
  projectFirestore,
  timestamp,
} from "../../config/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");

  const history = useHistory();

  const handleSignUp = (e) => {
    e.preventDefault();
    const createdAt = timestamp();
    projectAuth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        projectFirestore.collection("users").doc(cred.user.uid).set({
          createDate: createdAt,
          userName: userName,
        });
      })
      .then(() => {
        projectAuth.currentUser.updateProfile({
          displayName: userName,
        });
      })
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div className="signUp">
      <div className="signUp__content">
        <Link to="/">490px</Link>
        <span>Sign Up to Upload Your Own Photos</span>
        <form id="signUpForm" onSubmit={handleSignUp}>
          <div className="inputForm">
            <IoMdPerson />
            <input
              required
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="username"
            />
          </div>

          <div className="inputForm">
            <IoIosMail />
            <input
              required
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="email"
            />
          </div>

          <div className="inputForm">
            <IoMdKey />
            <input
              required
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
          </div>

          <div className="signUp__consentCheckbox">
            <input required id="consentCheck" type="checkbox" />
            <label htmlFor="consentCheck">
              By sign up to our service, you're agree to our code of conduct.
              490px will not use your account information outside of our
              services.
            </label>
          </div>

          <button className="modalButton">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
