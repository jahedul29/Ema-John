import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import "./ProductDetails.css";

const ProductDetails = () => {
  let { productKey } = useParams();

  const product = fakeData.find((pd) => pd.key === productKey);

  const { name, seller, price, img, stock, key } = product;
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
