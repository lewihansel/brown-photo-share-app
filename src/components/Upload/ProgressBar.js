import React, { useEffect } from "react";
import useImageUpload from "./useImageUpload";

const ProgressBar = ({
  imageName,
  imageDesc,
  imageCamSetting,
  imageFile,
  setLoading,
  setModalOpen,
}) => {
  const { imageUrl, progress } = useImageUpload(
    imageName,
    imageDesc,
    imageCamSetting,
    imageFile
  );

  useEffect(() => {
    if (imageUrl) {
      setLoading(false);
      setModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return (
    <div className="navbar__uploadLoading">
      <div style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
