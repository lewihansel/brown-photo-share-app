import React, { useState, useEffect, useContext } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import CapitalizeFirst from "../../utils/CapitalizeFirs";
import { projectFirestore, timestamp } from "../../config/firebase";
import PhotoModal from "./PhotoModal";
import { UserContext } from "../../context/UserContext";

const PhotoGridItem = ({ photo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    `https://ui-avatars.com/api/?name=${photo.uploadedBy}&size=30&background=DCDCDC&color=fff`
  );
  const [liked, setLiked] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    modalOpen
      ? window.addEventListener("keydown", handleEsc)
      : window.removeEventListener("keydown", handleEsc);
  }, [modalOpen]);

  useEffect(() => {
    const collectionRef = projectFirestore
      .collection("users")
      .doc(photo.userUid);

    collectionRef.get().then((doc) => {
      const userData = doc.data();
      if (userData.profilePic) {
        setUserPhoto(userData.profilePic);
      }
    });
  });

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setModalOpen(false);
      document.body.style.overflowY = "";
    }
  };

  const addLikes = () => {
    const collectionRef = projectFirestore
      .collection("490px__images")
      .doc(photo.id);

    if (photo.likesCount) {
      collectionRef.set(
        {
          likesCount: photo.likesCount + 1,
          lastUpdate: timestamp(),
          likedBy: [...photo.likedBy, user.uid],
        },
        { merge: true }
      );
    } else {
      collectionRef.set(
        {
          likesCount: 1,
          lastUpdate: timestamp(),
          likedBy: [user.uid],
        },
        { merge: true }
      );
    }
  };

  useEffect(() => {
    if (user) {
      const likedBy = new Set(photo.likedBy);
      setLiked(likedBy.has(user.uid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div key={photo.id} className="photoGrid__item">
      <div className="imageInfo">
        <div className="imageInfo__avatar">
          <img src={userPhoto} alt="avatar" />
          <span>{CapitalizeFirst(photo.uploadedBy)}</span>
        </div>

        <div
          className="imageInfo__button"
          onClick={() => {
            if (user) {
              if (!liked) {
                addLikes();
                setLiked(true);
              } else {
                alert("you already liked the post");
              }
            } else {
              alert("log in to like this photo");
            }
          }}
        >
          {photo.likesCount > 0 ? <IoIosHeart /> : <IoIosHeartEmpty />}
          {photo.likesCount}
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
        <PhotoModal
          photo={photo}
          userPhoto={userPhoto}
          setModalOpen={setModalOpen}
          liked={liked}
          setLiked={setLiked}
          addLikes={addLikes}
        />
      )}
    </div>
  );
};

export default PhotoGridItem;
