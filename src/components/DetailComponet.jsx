import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./common/Loader";
import commerce from "../lib/commerce";
import { useCartContext } from "../context/CartProvider";

function DetailComponet() {
  document.title = "Product | Shop It - A store where you find your need"
  const { cart, dispatch } = useCartContext();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { id } = params;

  const fetchProduct = async () => {
    setLoading(true);
    commerce.products
      .retrieve(id)
      .then((product) => {
        document.title = `${product.name} | Shop It`
        setProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleMinusQty = () => {
    setQuantity((prevState) => {
      let updatedState = prevState;
      if (updatedState > 1) {
        // Decrement quantity by 1 only if it is greater than 1
        updatedState -= 1;
      }
      return updatedState;
    });
  };

  const handlePlusQty = () => {
    setQuantity((prevState) => {
      let updatedState = prevState;
      if (updatedState < product.inventory?.available) {
        // Increment quantity by 1 only if it is less than inStock value
        updatedState += 1;
      }
      return updatedState;
    });
  };

  const handleAddOrRemove = () => {
    if (cart[id]) {
      if (cart[id].quantity !== quantity && quantity !== 1) {
        const payload = { product, quantity };
        dispatch({ type: "ADD_TO_CART", payload, id });
      } else {
        dispatch({ type: "REMOVE_FROM_CART", id });
      }
    } else {
      const payload = { product, quantity };
      dispatch({ type: "ADD_TO_CART", payload, id });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6 mt-28">
            <h2 className="text-2xl font-semibold mb-16">{product.name}</h2>
            <div className="flex flex-col sm:flex-row gap-x-20">
              <div className="sm:w-2/5 mb-6 sm:mb-0">
                <img
                  src={product.image?.url}
                  alt="Product Image"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="sm:w-3/5 sm:ml-6">
                <p className="text-gray-600 mb-4 text-left">
                  {product.description?.replace(/<[^>]*>?/gm, "")}
                </p>
                <p className="text-indigo-600 text-lg text-left font-semibold mb-4">
                  {product.price?.formatted_with_code}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={handleMinusQty}
                    className="text-gray-600 border rounded-full p-1 w-10 h-10 focus:outline-none hover:bg-indigo-600 hover:text-white flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                      stroke="currentColor"
                      fill="currentColor"
                    >
                      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={handlePlusQty}
                    className="text-gray-600 border rounded-full p-1 w-10 h-10 focus:outline-none hover:bg-indigo-600 hover:text-white flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                      stroke="currentColor"
                      fill="currentColor"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </button>
                  {quantity > 1 && (
                    <p className="h5 fw-semibold mt-2">
                      Total: {(quantity * product.price?.raw).toFixed(2)}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleAddOrRemove}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none"
                >
                  {product.inventory?.available > 0
                    ? cart[id]
                      ? cart[id].quantity !== quantity && quantity !== 1
                        ? "Update Cart"
                        : "Remove from Cart"
                      : "Add to Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold tracking-tight my-10 text-gray-700">
              Related Products
            </h2>
          </div>
        </>
      )}
    </>
  );
}

export default DetailComponet;
