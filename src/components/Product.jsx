import React from "react";
import "../styles/Product.css";
const Product = ({ name, price, description }) => {
  return (
    <div className='product'>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Precio: ${price}</p>
    </div>
  );
};

export default Product;
