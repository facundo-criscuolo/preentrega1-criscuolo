import React from "react";
import "./styles.css";

const AddToCart = ({ greeting }) => {
  return (
    <div>
      <h2 className="greeting">{greeting}</h2>
    </div>
  );
}

export default AddToCart;
