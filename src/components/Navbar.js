import React, { useState, useContext } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { useMediaPredicate } from "react-media-hook";
import UploadModal from "./Upload/UploadModal";
import LoginModal from "./UserAccount/LoginModal";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { projectAuth } from "../config/firebase";
import ProfileModal from "./UserAccount/ProfileModal";
import CapitalizeFirst from "../utils/CapitalizeFirs";

const Navbar = ({ setMobileDropdown, mobileDropdown }) => {
  const moreThan800 = useMediaPredicate("(min-width: 800px");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");

  const user = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar__leftElement">
        <div
          className="navbar__logo"
          onClick={() => {
            setMobileDropdown(!mobileDropdown);
          }}
        >
          490<sup>px</sup>
          {!moreThan800 && <GoChevronDown />}
        </div>

        {/* {moreThan800 && (
          <div className="navbar__dropdown">
            <div className="navbar__dropdownButton">
              <span>Dropdown 1</span>
              <GoChevronDown />
            </div>
          </div>
        )} */}
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

      {moreThan800 && (
        <div className="navbar__searchBox">
          {/* <label htmlFor="navSearch">
          <GoSearch />
        </label>
        <input type="text" id="navSearch" placeholder="search photo" /> */}
        </div>
      )}

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

        {user && user.displayName && (
          <div
            className="navbar__user"
            onClick={() => {
              if (selectedModal === "profile") {
                setModalOpen(!modalOpen);
              } else {
                setSelectedModal("profile");
                setModalOpen(true);
              }
            }}
          >
            <span>{`Hi, ${
              CapitalizeFirst(user.displayName).split(" ")[0]
            }`}</span>
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

        {modalOpen && selectedModal === "login" && (
          <LoginModal setModalOpen={setModalOpen} />
        )}

        {user && modalOpen && selectedModal === "profile" && (
          <ProfileModal user={user} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
