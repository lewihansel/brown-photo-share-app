import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Hero = () => {
  const user = useContext(UserContext);
  return (
    <>
      <div className="hero">
        <div className="hero__title">Discover Best Photo</div>
        {!user && (
          <div className="hero__subtitle">
            High Quality Photo, Uploaded by the Best Artist
          </div>
        )}
        {user && (
          <div className="hero__subtitle">
            {`Hello ${user.displayName}, check out this new photo, curated by our editor`}
          </div>
        )}
      </div>
      {/* sticky navbar on hero element */}
      {/* <div className="heroNav">
        <div className="heroNav__links">
          <div className="heroNav__item">POPULAR</div>
          <div className="heroNav__item">FRESH</div>
          <div className="heroNav__item">GALERY</div>
        </div>
      </div> */}
    </>
  );
};

export default Hero;
