import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartProvider";

function Header() {
  const { cart } = useCartContext();

  // For responsive navbar
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-x-4">
              <img className="h-8 w-auto" src="/logo.png" alt="Brand Logo" />
              <span className="font-bold">Shop It</span>
            </Link>
          </div>
          <div className={`flex lg:hidden`}>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5rem"
                viewBox="0 0 448 512"
                stroke="currentColor"
                fill="currentColor"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Categories
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Contact
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/cart"
              className="text-sm font-semibold leading-6 text-gray-900 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5rem"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>

              {Object.keys(cart).length ? (
                <div className="absolute flex items-center justify-start -top-4 -right-4">
                  <span className="h-[1.6rem] w-[1.6rem] p-1 bg-black text-white font-semibold text-sm rounded-full">
                    {" "}
                    {Object.keys(cart).length}
                  </span>
                </div>
              ) : (
                ""
              )}
            </Link>
          </div>
        </nav>
        {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
        <div
          className={`lg:hidden  ${mobileMenuOpen ? "" : "hidden"}`}
          role="dialog"
          aria-modal="true"
        >
          {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-x-4">
                <img className="h-8 w-auto" src="/logo.png" alt="Brand Logo" />
                <span className="font-bold">Shop It</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5rem"
                  viewBox="0 0 384 512"
                  stroke="currentColor"
                  fill="currentColor"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Products
                  </Link>
                  <Link
                    to="/categories"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    to="/cart"
                    className="-mx-3 flex w-full gap-x-3 items-center justify-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <span>Go to Cart</span>
                    <span className="h-[1.6rem] w-[1.6rem] p-1 bg-black text-white font-semibold text-sm rounded-full">
                      {Object.keys(cart).length}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
