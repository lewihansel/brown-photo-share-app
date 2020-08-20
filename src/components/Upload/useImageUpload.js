import { useState, useEffect, useContext } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../../config/firebase";
import { UserContext } from "../../context/UserContext";

const useImageUpload = (imageName, imageDesc, imageCamSetting, imageFile) => {
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const user = useContext(UserContext);

  useEffect(() => {
    //refrences
    const storageRef = projectStorage.ref(
      `490px/${user.uid}/${imageFile.name}`
    );
    const collectionRef = projectFirestore.collection("490px__images");

    //put file in storage
    storageRef.put(imageFile).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setErrorMsg(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({
          imageUrl: url,
          createdAt,
          imageName,
          imageDesc,
          imageCamSetting,
          uploadedBy: user.displayName,
        });
        setImageUrl(url);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageCamSetting, imageDesc, imageFile, imageName]);

  return { progress, errorMsg, imageUrl };
};

export default useImageUpload;
