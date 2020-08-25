import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { GridContext } from "../context/GridContext";
import CapitalizeFirst from "../utils/CapitalizeFirs";

const Hero = () => {
  const user = useContext(UserContext);
  const { changeNavSelector } = useContext(
    GridContext
  );

  useEffect(() => {
    document
      .querySelector("#heroNav__fresh")
      .classList.add("heroNav__selected");
  }, []);

  return (
    <>
      <div className="hero">
        <div className="hero__title">Best Photo from The Best Artist</div>
        {!user && (
          <div className="hero__subtitle">
            High Quality Photo, Uploaded by the Best Artist
          </div>
        )}
        {user && (
          <div className="hero__subtitle">
            {`Hello ${CapitalizeFirst(
              user.displayName
            )}, check out this new photo, uploaded by other photographer.`}
          </div>
        )}
      </div>
      {/* sticky navbar on hero element */}
      <div className="heroNav">
        <div className="heroNav__links">
          <div
            className="heroNav__item"
            id="heroNav__popular"
            onClick={() => {
              changeNavSelector("popular");
              document
                .getElementById("heroNav__fresh")
                .classList.remove("heroNav__selected");
              document
                .getElementById("heroNav__myPhotos")
                .classList.remove("heroNav__selected");
              document
                .querySelector("#heroNav__popular")
                .classList.add("heroNav__selected");
            }}
          >
            POPULAR
          </div>
          <div
            className="heroNav__item"
            id="heroNav__fresh"
            onClick={() => {
              changeNavSelector("fresh");
              document
                .getElementById("heroNav__popular")
                .classList.remove("heroNav__selected");
              document
                .getElementById("heroNav__myPhotos")
                .classList.remove("heroNav__selected");

              document
                .querySelector("#heroNav__fresh")
                .classList.add("heroNav__selected");
            }}
          >
            FRESH
          </div>
          <div
            className="heroNav__item"
            id="heroNav__myPhotos"
            onClick={() => {
              if (user) {
                changeNavSelector("userImages");
                document
                  .getElementById("heroNav__fresh")
                  .classList.remove("heroNav__selected");
                document
                  .getElementById("heroNav__popular")
                  .classList.remove("heroNav__selected");
                document
                  .querySelector("#heroNav__myPhotos")
                  .classList.add("heroNav__selected");
              } else {
                alert("not logged in");
              }
            }}
          >
            MY PHOTOS
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
