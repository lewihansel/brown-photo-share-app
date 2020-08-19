import React from "react";
import useFetchPhotos from "./useFetchPhotos";
import PhotoGridItem from "./PhotoGridItem";

const PhotoGrid = () => {
  const { uploadedPhotos } = useFetchPhotos("490px__image");
  const photos = [
    "https://images.unsplash.com/photo-1597511880205-2d599e0c95ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    "https://images.unsplash.com/photo-1597065886004-bfb7811d73bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    "https://images.unsplash.com/photo-1597523565663-916cf059f524?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1597545144828-068385bfe8e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=659&q=80",
    "https://images.unsplash.com/photo-1597523565668-acec5c964780?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1597535973747-951442d5dbc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80",
    "https://images.unsplash.com/photo-1597503503489-ee629fd9d4d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1597549808977-90a5c7bd806b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    "https://images.unsplash.com/photo-1597533208002-e94b323bd6f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1597503505646-1cea7a9e796d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1597453094683-32ba3046d128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80",
    "https://images.unsplash.com/photo-1597586146295-66a7ade013a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  ];
  return (
    <div className="photoGrid">
      {uploadedPhotos?.map((photo) => (
        <PhotoGridItem photo={photo} />
      ))}
      {photos.map((photo) => (
        <div layout key={photo} className="photoGrid__item">
          <img src={photo} alt={`placeholder from ${photo}`} />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
