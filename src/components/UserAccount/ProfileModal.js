import React, { useState } from "react";
import { IoIosAdd, IoIosTrash, IoMdCheckboxOutline } from "react-icons/io";
import CapitalizeFirst from "../../utils/CapitalizeFirs";
import {
  projectStorage,
  projectFirestore,
  timestamp,
  projectAuth,
} from "../../config/firebase";

const ProfileModal = ({ user }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const acceptedTypes = ["image/png", "image/jpeg"];

  const imageHandler = (e) => {
    if (acceptedTypes.includes(e.target.files[0].type)) {
      setUploadedImage(e.target.files[0]);
    } else {
      alert("PNG or JPEG format only");
    }
  };

  const clearUpload = () => {
    setUploadedImage(null);
  };

  const uploadPhoto = () => {
    setLoading(true);

    //storage and db refrence
    const storageRef = projectStorage.ref(
      `profilePhoto/${user.uid}/${uploadedImage.name}`
    );
    const collectionRef = projectFirestore.collection("users").doc(user.uid);

    //putting file in storage and db
    storageRef.put(uploadedImage).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        alert(err.message);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const lastUpdate = timestamp();
        await collectionRef.set(
          {
            profilePic: url,
            lastUpdate,
          },
          { merge: true }
        );
        await projectAuth.currentUser
          .updateProfile({
            photoURL: url,
          })
          .then(() => {
            console.log(user);
            setLoading(false);
            setUploadedImage(false);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    );
  };

  return (
    <div className="profileModal">
      <img
        src={
          user.photoURL
            ? user.photoURL
            : `https://ui-avatars.com/api/?name=${user.displayName}&size=100&background=DCDCDC&color=fff`
        }
        alt="placeholder user avatar"
      />

      <strong>{CapitalizeFirst(user.displayName)}</strong>
      <span>{user.email}</span>

      <label className="modalButton profileModalBtn">
        <input type="file" onChange={imageHandler} />
        <IoIosAdd /> {uploadedImage ? "Change Upload" : "Change Photo"}
      </label>

      {uploadedImage && (
        <label
          className="modalButton profileModalBtn btnDelete"
          onClick={clearUpload}
        >
          <IoIosTrash /> Clear Upload
        </label>
      )}
      {uploadedImage && (
        <img
          src={URL.createObjectURL(uploadedImage)}
          alt="upload preview"
          className="modalUploadPreview"
        />
      )}
      {uploadedImage && (
        <label className="modalButton profileModalBtn" onClick={uploadPhoto}>
          <IoMdCheckboxOutline /> Update Photo
        </label>
      )}

      {loading && (
        <div className="navbar__uploadLoading">
          <div style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
