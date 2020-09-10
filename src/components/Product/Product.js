import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="single-product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="product-info">
        <h3>
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <p>by {seller}</p>
        <p>${price}</p>
        <br />
        <p>
          <small>only {stock} left in stock</small>
        </p>
        {props.showAddToCart && (
          <button
            className="product-button"
            onClick={() => {
              props.handleAddProduct(props.product);
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
