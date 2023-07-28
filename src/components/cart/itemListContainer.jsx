import React from "react";
import Cart from "./cartWidget";
import "./styles.css";
import { useContext } from "react";
import { CartContext } from "../../context/cart-context";

const HeaderCartCount = () => {

  const { cart, getCartTotalQuantity } = useContext(CartContext);

  return (
        <span className="cartCount">{getCartTotalQuantity()}</span>
  );
}

export default HeaderCartCount;
