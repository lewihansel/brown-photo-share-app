import React, { useState, useContext } from "react";
import { IoIosCamera, IoMdImage, IoIosLogIn } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { UserContext } from "../../context/UserContext";

const UploadModal = ({ setModalOpen }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageDesc, setImageDesc] = useState("");
  const [imageCamSetting, setImageCamSetting] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);
  const acceptedTypes = ["image/png", "image/jpeg"];

  const previewUploadHandler = (e) => {
    let imageUploaded = e.target.files[0];
    if (imageUploaded && acceptedTypes.includes(imageUploaded.type)) {
      setImagePreview(URL.createObjectURL(imageUploaded));
      setImageFile(imageUploaded);
    } else {
      alert("bad upload, please upload Image in format PNG or JPEG");
    }
  };

  const descriptionUploadHandler = (e) => {
    e.preventDefault();
    console.log(imageFile);
    setLoading(true);
  };

  return (
    <div className="navbar__dropdownModal">
      {imagePreview && (
        <label
          className="navbar__dropdownUploadInput btnDelete"
          onClick={() => {
            setImageFile(null);
            setImagePreview(null);
          }}
        >
          <span>
            <FaTrashAlt /> Clear Form
          </span>
        </label>
      )}
      {user && (
        <label className="navbar__dropdownUploadInput">
          <input type="file" onChange={previewUploadHandler} />
          {!imagePreview && <AiOutlineCloudUpload />}
          {!imagePreview && <span>Upload Image</span>}
          {imagePreview && <span>Change Image</span>}
        </label>
      )}

      {!user && (
        <label className="navbar__dropdownUploadInput">
          <IoIosLogIn />
          <span>Login to Upload</span>
        </label>
      )}

      {imagePreview && (
        <div className="navbar__dropdownUploadPreview">
          <img src={imagePreview} alt="uploaded preview" />
        </div>
      )}
      {imagePreview && (
        <form
          className="navbar__dropdownUploadDescription"
          onSubmit={descriptionUploadHandler}
        >
          <div className="navbar__uploadForm">
            <IoMdImage />
            <input
              required
              type="text"
              placeholder="image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
          </div>
          <textarea
            required
            rows="5"
            placeholder="image description"
            value={imageDesc}
            onChange={(e) => setImageDesc(e.target.value)}
          />
          <div className="navbar__uploadForm">
            <IoIosCamera />
            <input
              required
              type="text"
              placeholder="camera setting"
              value={imageCamSetting}
              onChange={(e) => setImageCamSetting(e.target.value)}
            />
          </div>
          <button className="navbar__dropdownUploadBtn" type="submit">
            Upload Image
          </button>

          {loading && (
            <ProgressBar
              imageName={imageName}
              imageDesc={imageDesc}
              imageCamSetting={imageCamSetting}
              imageFile={imageFile}
              setLoading={setLoading}
              setModalOpen={setModalOpen}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default UploadModal;
