import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  document.title = "Page Not Found | Shop It - A store where you find your need";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-4">
          Looks like the product you're searching for has decided to take a
          break from our virtual shelves.
          <br />
          Why not explore our other amazing products?
        </p>
        <Link to="/" className="text-blue-500 font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Page404;
