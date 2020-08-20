import React from "react";
import { IoIosAdd } from "react-icons/io";
import CapitalizeFirst from "../../utils/CapitalizeFirs";

const ProfileModal = ({ user }) => {
  return (
    <div className="profileModal">
      {!user.photoURL && (
        <img
          src={`https://ui-avatars.com/api/?name=${user.displayName}&size=100&background=DCDCDC&color=fff`}
          alt="placeholder user avatar"
        />
      )}
      <strong>{CapitalizeFirst(user.displayName)}</strong>
      <span>{user.email}</span>
      {!user.photoURL && (
        <button className="modalButton profileModalBtn">
          <IoIosAdd /> Profile Photo
        </button>
      )}
    </div>
  );
};

export default ProfileModal;
