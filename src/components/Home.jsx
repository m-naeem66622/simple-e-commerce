import React from "react";
import HeroSection from "./HeroSection";
import ProductsList from "./ProductsList";

function Home({ cart, dispatch }) {
  document.title = "Home | Shop It - A store where you find your need"
  return (
    <>
      <HeroSection />
      <ProductsList cart={cart} dispatch={dispatch} />
    </>
  );
}

export default Home;
