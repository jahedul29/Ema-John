import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  let { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("https://ema-john-server-jahed.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  const { name, seller, price, img, stock } = product;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="product-details">
        <h1>Product Details</h1>
        <br />
        {/* <Product showAddToCart={false} product={product}></Product> */}
        <img
          src={img}
          style={{ width: "40%", border: "2px solid orange" }}
          alt=""
        />
        <h3 style={{ color: "green" }}>{name}</h3>
        <p>by {seller}</p>
        <p>only {stock} left in stock</p>
        <h2 style={{ color: "blue" }}>{price}</h2>
        <br />
        <br />
      </div>
    </div>
  );
};

export default ProductDetails;
