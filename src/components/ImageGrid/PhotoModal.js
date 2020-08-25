import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  IoMdPerson,
  IoMdCamera,
  IoMdArrowRoundBack,
  IoIosHeart,
  IoIosHeartEmpty,
} from "react-icons/io";
import { UserContext } from "../../context/UserContext";

const PhotoModal = ({
  photo,
  userPhoto,
  setModalOpen,
  liked,
  addLikes,
  setLiked,
}) => {
  const [, setEditPost] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user.uid === photo.userUid) {
      setEditPost(true);
      console.log(user.uid, photo.userUid);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
          <img className="photoModal__avatar" src={userPhoto} alt="avatar" />
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
          <div
            className="editPostBtn btn"
            onClick={() => {
              if (!liked) {
                addLikes();
                setLiked(true);
              } else {
                alert("you already liked the post");
              }
            }}
          >
            {photo.likesCount > 0 ? <IoIosHeart /> : <IoIosHeartEmpty />}
            {photo.likesCount}
          </div>
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
  );
};

export default PhotoModal;
