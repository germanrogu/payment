import React from "react";
import img from "../assets/product.webp";
const Product = (props) => {
  const { name, color, size, price, description } = props.product;
  return (
    <div className='product-card'>
      <div className='product-image'>
        <img src={img} alt='Product' />
      </div>
      <div className='product-info'>
        <p className='product-name'>{name}</p>
        <p className='product-color'>Color: {color}</p>
        <p className='product-quantity'>Size: {size}</p>
        <p className='product-quantity'>Description: {description}</p>
        <p className='product-price'>${price}</p>
      </div>
    </div>
  );
};

export default Product;
