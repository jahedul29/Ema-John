import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const totalPrice = props.cart.reduce((total, pd) => total + pd.price, 0);

  let shipping;
  if (totalPrice > 500 || totalPrice === 0) {
    shipping = 0.0;
  } else if (totalPrice >= 100) {
    shipping = 8.0;
  } else if (totalPrice < 100) {
    shipping = 12.99;
  }

  const tax = totalPrice / 10;

  const formatNumber = (num) => {
    return Number(num.toFixed(2));
  };

  const grandTotal = totalPrice + shipping + tax;

  return (
    <div>
      <h3>Order Summery</h3>
      <p>Items Ordered: {props.cart.length}</p>
      <p>Product Price: {totalPrice}</p>
      <p>Shipping Cost: {shipping}</p>
      <p>
        <small>Tax + VAT: {formatNumber(tax)}</small>
      </p>
      <h3>Total Price: {formatNumber(grandTotal)}</h3>
      <Link to="/review">
        <button>Review Order</button>
      </Link>
    </div>
  );
};

export default Cart;
