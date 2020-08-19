import React, { useState } from "react";
import { IoIosHeartEmpty, IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

const PhotoGridItem = ({ photo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div layout key={photo.id} className="photoGrid__item">
      <div className="imageInfo">
        <div className="imageInfo__avatar">
          <img
            src="https://dummyimage.com/30x30/e0e0e0/0011ff.jpg"
            alt="avatar"
          />
          <span>{photo.uploadedBy}</span>
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
                src="https://dummyimage.com/80x80/e0e0e0/0011ff.jpg"
                alt="avatar"
              />
              <span className="photoModal__titleText">
                <h2>{photo.imageName}</h2>
                <span>{`by ${photo.uploadedBy}`}</span>
              </span>
            </div>

            <span className="photoModal__imageDescription">
              <strong>Description: </strong>
              {photo.imageDesc}
            </span>

            <span className="photoModal__imageDescription">
              <strong>Camera Info: </strong>
              {photo.imageCamSetting}
            </span>

            <div
              className="photoModal__closeButton"
              onClick={() => {
                setModalOpen(false);
                document.body.style.overflowY = "";
              }}
            >
              <IoIosClose />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PhotoGridItem;
