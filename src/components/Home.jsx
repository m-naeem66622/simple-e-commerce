import React from "react";
import HeroSection from "./HeroSection";
import ProductsList from "./ProductsList";

function Home({ cart, dispatch }) {
  return (
    <>
      <HeroSection />
      <ProductsList cart={cart} dispatch={dispatch} />
    </>
  );
}

export default Home;
