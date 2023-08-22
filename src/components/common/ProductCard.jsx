import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, cart, dispatch }) {
  const { id, name, price, image } = product;

  const handleAddOrRemove = () => {
    if (cart[id]) {
      dispatch({ type: "REMOVE_FROM_CART", id });
    } else {
      const payload = { product, quantity: 1 };
      dispatch({ type: "ADD_TO_CART", payload, id });
    }
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={image.url}
          alt="Front of men&#039;s Basic Tee in black."
          className="h-full w-full object-contain object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="w-3/5">
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${id}`}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {name}
            </Link>
          </h3>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900">
            {price.formatted_with_code}
          </p>
          <button
            onClick={handleAddOrRemove}
            className="bg-indigo-600 text-white py-1 px-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 focus:outline-none z-50"
          >
            {cart[id] ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
