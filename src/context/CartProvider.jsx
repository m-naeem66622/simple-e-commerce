import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../helper/cartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
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
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to get data from Provider
export const useCartContext = () => useContext(CartContext);

export default CartProvider;
