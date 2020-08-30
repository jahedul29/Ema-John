import React from "react";
import { Link } from "react-router-dom";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  console.log(props.product);
  const { img, name, seller, price, key } = props.product[0];
  const quantity = props.product.quantity;

  return (
    <div className="review-product">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="reviewProduct-info">
        <h3>
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <p>by {seller}</p>
        <p>${price}</p>
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
        <button>Remove</button>
      </div>
    </div>
  );
};

export default ReviewItem;
