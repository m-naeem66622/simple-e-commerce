import React from "react";
import HeroSection from "./HeroSection";
import ProductsList from "./ProductsList";


function Home() {
  document.title = "Home | Shop It - A store where you find your need"
  
  return (
    <>
      <HeroSection />
      <ProductsList />
    </>
  );
}

export default Home;
