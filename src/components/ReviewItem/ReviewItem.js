import React from "react";
import { Link } from "react-router-dom";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const { img, name, price, key } = props.product;
  const quantity = props.product.quantity;
  const removeItem = props.removeItem;

  return (
    <div className="review-product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="reviewProduct-info">
        <h3>
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <h3>Total Count: {quantity}</h3>
        <h3>
          Total Price:{" "}
          {"( " +
            quantity +
            " × " +
            price +
            " ) = " +
            Math.round(parseFloat(quantity) * parseFloat(price))}
        </h3>
        <button
          onClick={() => {
            removeItem(key);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
