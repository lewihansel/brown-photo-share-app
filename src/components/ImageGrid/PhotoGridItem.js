import React, { useState, useEffect } from "react";
import {
  IoIosHeartEmpty,
  IoMdPerson,
  IoMdCamera,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { motion } from "framer-motion";
import CapitalizeFirst from "../../utils/CapitalizeFirs";

const PhotoGridItem = ({ photo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    modalOpen
      ? window.addEventListener("keydown", handleEsc)
      : window.removeEventListener("keydown", handleEsc);
  });

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setModalOpen(false);
      document.body.style.overflowY = "";
    }
  };

  return (
    <div key={photo.id} className="photoGrid__item">
      <div className="imageInfo">
        <div className="imageInfo__avatar">
          <img
            src={`https://ui-avatars.com/api/?name=${photo.uploadedBy}&size=30&background=DCDCDC&color=fff`}
            alt="avatar"
          />
          <span>{CapitalizeFirst(photo.uploadedBy)}</span>
        </div>
        <div className="imageInfo__button">
          <IoIosHeartEmpty />
        </div>
      </div>
      <img
        src={photo.imageUrl}
        alt={photo.imageName}
        onClick={() => {
          setModalOpen(true);
          document.body.style.overflowY = "hidden";
        }}
      />

      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="photoModal"
        >
          <motion.div
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="photoModal__Content"
          >
            <img src={photo.imageUrl} alt={photo.imageName} />

            <div className="photoModal__title">
              <img
                className="photoModal__avatar"
                src={`https://ui-avatars.com/api/?name=${photo.uploadedBy}&size=80&background=DCDCDC&color=fff`}
                alt="avatar"
              />
              <span className="photoModal__titleText">
                <h2>{photo.imageName}</h2>
                <span>
                  <IoMdPerson />
                  <span>{photo.uploadedBy}</span>
                </span>

                <span className="photoModal__camSetting">
                  <IoMdCamera />
                  <span>
                    <small>{photo.imageCamSetting}</small>
                  </span>
                </span>
              </span>
            </div>

            <span className="photoModal__imageDescription">
              <strong>{photo.uploadedBy}</strong>
              <span>{photo.imageDesc}</span>
            </span>

            <div
              className="photoModal__closeButton"
              onClick={() => {
                setModalOpen(false);
                document.body.style.overflowY = "";
              }}
            >
              <IoMdArrowRoundBack />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PhotoGridItem;
