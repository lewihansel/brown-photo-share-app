import React, { useState, useContext } from "react";
import { GoSearch, GoChevronDown } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { useMediaPredicate } from "react-media-hook";
import UploadModal from "./Upload/UploadModal";
import LoginModal from "./UserAccount/LoginModal";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { projectAuth } from "../config/firebase";

const Navbar = () => {
  const moreThan800 = useMediaPredicate("(min-width: 800px");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");

  const user = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar__leftElement">
        <div className="navbar__logo">
          490<sup>px</sup>
        </div>
        {moreThan800 ? null : <GoChevronDown />}
        {moreThan800 && (
          <div className="navbar__dropdown">
            <div className="navbar__dropdownButton">
              <span>Dropdown 1</span>
              <GoChevronDown />
            </div>
          </div>
        )}
        {moreThan800 && (
          <div className="navbar__dropdown">
            <div
              className="navbar__dropdownButton"
              onClick={() => {
                if (selectedModal === "upload") {
                  setModalOpen(!modalOpen);
                } else {
                  setSelectedModal("upload");
                  setModalOpen(true);
                }
              }}
            >
              <span>Upload</span>
              <GoChevronDown />
            </div>

            {modalOpen && selectedModal === "upload" && (
              <UploadModal setModalOpen={setModalOpen} />
            )}
          </div>
        )}
      </div>

      <div className="navbar__searchBox">
        <label htmlFor="navSearch">
          <GoSearch />
        </label>
        <input type="text" id="navSearch" placeholder="search photo" />
      </div>

      {moreThan800 && (
        <div className="navbar__rightElement">
          {!user && (
            <button
              className="navbar__login navBtn"
              onClick={() => {
                if (selectedModal === "login") {
                  setModalOpen(!modalOpen);
                } else {
                  setSelectedModal("login");
                  setModalOpen(true);
                }
              }}
            >
              Login
            </button>
          )}

          {user && (
            <div className="navbar__user">
              <span>{`Hi, ${user.displayName}`}</span>
              <GoChevronDown />
            </div>
          )}

          {!user && (
            <Link to="/signup" className="navbar__signup navBtn">
              Signup
            </Link>
          )}

          {user && (
            <button
              className="navbar__logout navBtn btnDelete"
              onClick={() => {
                projectAuth.signOut();
              }}
            >
              LogOut
              <IoIosLogOut />
            </button>
          )}

          {modalOpen && selectedModal === "login" && <LoginModal />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
