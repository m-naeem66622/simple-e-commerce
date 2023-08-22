import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commerce from "../lib/commerce";
import Loader from "./common/Loader";
import ProductCard from "./common/ProductCard";

function Category({ cart, dispatch }) {
  const params = useParams();
  const { slug } = params;
  const [products, setProducts] = useState({ category: "", data: [] });
  const [loading, setLoading] = useState(false);

  const fetchProductsOfCategory = async () => {
    setLoading(true);
    // Fetch products specifying a category slug
    const data = await commerce.products
      .list({
        category_slug: [slug],
      })
      .then((response) => response.data)
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    const category = await commerce.categories
      .retrieve(slug, { type: "slug" })
      .then((category) => category.name)
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    setProducts({ category, data });
    setLoading(false);
  };

  useEffect(() => {
    fetchProductsOfCategory();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-700">
          {products.category}
        </h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.data.map((product) => (
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

export default Category;
