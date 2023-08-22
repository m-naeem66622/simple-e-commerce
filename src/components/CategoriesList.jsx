import React, { useEffect, useState } from "react";
import commerce from "../lib/commerce";
import Loader from "./common/Loader";
import { Link } from "react-router-dom";

function CategoriesList() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    setLoading(true);

    commerce.categories
      .list()
      .then((category) => {
        setCategories(category.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-700">
          Our Categories
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="relative aspect-w-2 aspect-h-3">
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h2 className="text-xl font-semibold mb-2 transition duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        {category.name}
                      </h2>
                      <p className="text-sm overflow-hidden max-h-16 transition duration-300 opacity-0 transform -translate-y-2 group-hover:translate-y-0">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <img
                    src={category.assets[0].url}
                    alt="Category Image"
                    className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-70"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesList;
