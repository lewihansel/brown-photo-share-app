import React, { useState, useContext } from "react";
import {
  IoIosCloudUpload,
  IoIosLogIn,
  IoMdImage,
  IoIosCamera,
  IoIosQuote,
} from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ProgressBar from "../Upload/ProgressBar";
import { UserContext } from "../../context/UserContext";

const MobileUpload = ({ setMobileDropdown }) => {
  //upload handler
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
    <div className="mobileUpload__modal">
      {imagePreview && (
        <label
          className="mobileUpload__modalInput btnDelete"
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
        <label className="mobileUpload__modalInput">
          <input type="file" onChange={previewUploadHandler} />
          {!imagePreview && <AiOutlineCloudUpload />}
          {!imagePreview && <span>Upload Image</span>}
          {imagePreview && <span>Change Image</span>}
        </label>
      )}

      {!user && (
        <label className="mobileUpload__modalInput">
          <IoIosLogIn />
          <span>Login to Upload</span>
        </label>
      )}

      {imagePreview && (
        <div className="mobileUpload__modalPreview">
          <img src={imagePreview} alt="uploaded preview" />
        </div>
      )}
      {imagePreview && (
        <form
          className="mobileUpload__modalDescripton"
          onSubmit={descriptionUploadHandler}
        >
          <div className="mobileForm">
            <IoMdImage />
            <input
              required
              type="text"
              placeholder="image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
          </div>
          <div className="mobileForm">
            <IoIosQuote />
            <textarea
              required
              rows="5"
              placeholder="image description"
              value={imageDesc}
              onChange={(e) => setImageDesc(e.target.value)}
            />
          </div>
          <div className="mobileForm">
            <IoIosCamera />
            <input
              required
              type="text"
              placeholder="camera setting"
              value={imageCamSetting}
              onChange={(e) => setImageCamSetting(e.target.value)}
            />
          </div>
          <button className="mobileBtn" type="submit">
            <IoIosCloudUpload />
            Upload Image
          </button>

          {loading && (
            <ProgressBar
              imageName={imageName}
              imageDesc={imageDesc}
              imageCamSetting={imageCamSetting}
              imageFile={imageFile}
              setLoading={setLoading}
              setModalOpen={setMobileDropdown}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default MobileUpload;
