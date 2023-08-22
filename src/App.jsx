import "./App.css";
import { Route, Routes } from "react-router-dom";
import DetailComponet from "./components/DetailComponet";
import ProductsList from "./components/ProductsList";
import Home from "./components/Home";
import Header from "./components/Header";
import Cart from "./components/Cart";
import CategoriesList from "./components/CategoriesList";
import Category from "./components/Category";
import Page404 from "./components/Page404";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Page404 />} />
        <Route
          path="/product/:id"
          element={<DetailComponet/>}
        />
        <Route
          path="/categories"
          element={<CategoriesList />}
        />
        <Route
          path="/category/:slug"
          element={<Category />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/products"
          element={<ProductsList />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
