import "./App.css";
import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import DetailComponet from "./components/DetailComponet";
import ProductsList from "./components/ProductsList";
import Home from "./components/Home";
import Header from "./components/Header";
import cartReducer from "./helper/cartReducer";
import Cart from "./components/Cart";
import CategoriesList from "./components/CategoriesList";
import Category from "./components/Category";
import Page404 from "./components/Page404";

function App() {
  const [cart, dispatch] = useReducer(cartReducer, {});

  // get the cart state from local storage
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parseData = JSON.parse(cartItems);
      if (typeof parseData === "object" && Object.keys(parseData).length) {
        dispatch({ type: "SET_CART", payload: parseData });
      }
    }
  }, []);

  // Upadte the cart data to local storage
  useEffect(() => {
    if (Object.keys(cart).length) {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/*" element={<Page404 />} />
        <Route
          path="/product/:id"
          element={<DetailComponet cart={cart} dispatch={dispatch} />}
        />
        <Route
          path="/categories"
          element={<CategoriesList cart={cart} dispatch={dispatch} />}
        />
        <Route
          path="/category/:slug"
          element={<Category cart={cart} dispatch={dispatch} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} dispatch={dispatch} />}
        />
        <Route
          path="/products"
          element={<ProductsList cart={cart} dispatch={dispatch} />}
        />
        <Route path="/" element={<Home cart={cart} dispatch={dispatch} />} />
      </Routes>
    </>
  );
}

export default App;
