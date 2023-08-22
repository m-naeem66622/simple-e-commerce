import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart, dispatch }) {
  const calculate = () => {
    return Number(
      Object.values(cart).reduce(
        (acc, curr) => acc + curr.product.price.raw * curr.quantity,
        0
      )
    );
  };

  return (
    <div className="flex max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-20">
      {Object.keys(cart).length ? (
        <>
          <div className="w-2/3 pr-8">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="text-xl font-semibold mb-4">
                Items in your shopping cart
              </h2>
              <ul role="list">
                {Object.values(cart).map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-start justify-between border-b border-gray-300 pb-4 mb-4"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product.image.url}
                        alt="Product Image"
                        className="w-32 h-auto rounded-lg shadow-md"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-left">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mt-1 text-left">
                          {(item.product.price.raw * item.quantity).toFixed(2)}{" "}
                          PKR
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            dispatch({
                              type: "DECREMENT_QUANTITY",
                              id: item.product.id,
                            })
                          }
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
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "INCREMENT_QUANTITY",
                              id: item.product.id,
                            })
                          }
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
                      </div>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            id: item.product.id,
                          })
                        }
                        className="text-red-600 border focus:outline-none hover:text-white hover:bg-red-600 p-1 w-10 h-10 flex items-center justify-center rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1.2em"
                          viewBox="0 0 384 512"
                          stroke="currentColor"
                          fill="currentColor"
                        >
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="w-1/3 pl-8">
            <section className="sticky top-10" aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="text-xl font-semibold mb-4">
                Order summary
              </h2>
              <dl className="border-t border-gray-300 pt-4">
                <div className="flex justify-between py-2">
                  <dt className="text-lg">Subtotal</dt>
                  <dd className="text-lg">
                    {Object.values(cart).length > 0 && calculate().toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-lg">Shipping estimate</dt>
                  <dd className="text-lg">Free</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-lg">Tax estimate</dt>
                  <dd className="text-lg">5%</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-xl font-semibold">Order total</dt>
                  <dd className="text-xl font-semibold">
                    {Object.values(cart).length > 0 &&
                      (calculate() + (5 / 100) * calculate()).toFixed(2)}
                  </dd>
                </div>
              </dl>
              <div className="mt-4">
                <button
                  type="submit"
                  className="block w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  Checkout
                </button>
              </div>
            </section>
          </div>
        </>
      ) : (
        <div className="mx-auto py-20">
          <h1 className="lg:text-4xl sm:text-2xl font-black mb-8">
            Is there nothing you want from the universe?
          </h1>
          <Link
            to="/products"
            className="bg-indigo-600 text-white py-2 px-2 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none"
          >
            No, I Want and to Explore
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
