import React, { useState } from "react";
import Navbar from "../Navbar";
import Hero from "../Hero";
import PhotoGrid from "../ImageGrid/PhotoGrid";
import { useMediaPredicate } from "react-media-hook";
import MobileUpload from "../Upload/MobileUpload";

const Home = () => {
  const moreThan800 = useMediaPredicate("(min-width: 800px");
  const [mobileDropdown, setMobileDropdown] = useState(false);

  return (
    <>
      <Navbar
        setMobileDropdown={setMobileDropdown}
        mobileDropdown={mobileDropdown}
      />
      {mobileDropdown && !moreThan800 && (
        <div className="mobileDropdown">
          <MobileUpload setMobileDropdown={setMobileDropdown} />
        </div>
      )}
      <Hero />
      <PhotoGrid />
    </>
  );
};

export default Home;
