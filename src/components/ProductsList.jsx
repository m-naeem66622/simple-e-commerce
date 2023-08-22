import React, { useEffect, useState } from "react";
import ProductCard from "./common/ProductCard";
import Loader from "./common/Loader";
import commerce from "../lib/commerce";

function ProductsList({ cart, dispatch }) {
  document.title = "Products | Shop It - A store where you find your need";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch products data from Chec and stores in the products data object.
   * https://commercejs.com/docs/sdk/products
   */
  const fetchProducts = () => {
    setLoading(true);

    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("There was an error fetching the products", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-700">
          Our Collection
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard
                cart={cart}
                dispatch={dispatch}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;
