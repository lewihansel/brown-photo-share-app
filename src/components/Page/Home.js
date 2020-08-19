import React from "react";
import Navbar from "../Navbar";
import Hero from "../Hero";
import PhotoGrid from "../ImageGrid/PhotoGrid";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <PhotoGrid />
    </>
  );
};

export default Home;
