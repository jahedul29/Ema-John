import React from "react";
import { getDatabaseCart } from "../../utilities/databaseManager";
import { useState } from "react";
import { useEffect } from "react";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartDataFromDatabase = getDatabaseCart();
    const cartProductKeys = Object.keys(cartDataFromDatabase);

    const cartProduct = cartProductKeys.map((key) => {
      const product = fakeData.filter((pd) => pd.key === key);
      product.quantity = cartDataFromDatabase[key];
      return product;
    });
    setCart(cartProduct);
  }, []);

  // const totalItem = cart.reduce(() => {}, 0);

  return (
    <div>
      <h1>Review Ordered Items</h1>
      {cart.map((pd) => (
        <ReviewItem product={pd}></ReviewItem>
      ))}
    </div>
  );
};

export default Review;
