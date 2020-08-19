import { useState, useEffect } from "react";
import { projectFirestore } from "../../config/firebase";

const useFetchPhotos = (collection) => {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let photoCollection = [];
        snap.forEach((photo) => {
          photoCollection.push({ ...photo.data(), id: photo.id });
        });
        setUploadedPhotos(photoCollection);
      });
    return () => unsub();
  }, [collection]);

  return { uploadedPhotos };
};

export default useFetchPhotos;
