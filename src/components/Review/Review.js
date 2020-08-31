import React from "react";
import "./Review.css";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import { useState } from "react";
import { useEffect } from "react";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import ThankYouImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const removeItem = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    removeFromDatabaseCart(productKey);
    setCart(newCart);
  };

  const placeOrder = () => {
    processOrder();
    setIsOrderPlaced(true);
    setCart([]);
  };

  useEffect(() => {
    const cartDataFromDatabase = getDatabaseCart();
    const cartProductKeys = Object.keys(cartDataFromDatabase);

    const cartProduct = cartProductKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = cartDataFromDatabase[key];
      return product;
    });
    setCart(cartProduct);
  }, []);

  let placedImage;
  if (isOrderPlaced) {
    placedImage = <img src={ThankYouImage} alt="" />;
  }

  const heading = isOrderPlaced ? "Order Placed" : "Review Ordered Items";

  return (
    <>
      {cart.length ? (
        <div className="review-container">
          <div className="product-container">
            <h1>{heading}</h1>

            {cart.map((pd) => (
              <ReviewItem
                key={pd.key}
                removeItem={removeItem}
                product={pd}
              ></ReviewItem>
            ))}
            {placedImage}
          </div>
          <div className="cart-container">
            <Cart cart={cart}>
              <button onClick={placeOrder}>Place Order</button>
            </Cart>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h1 style={{ color: "red", lineHeight: "20px" }}>Sorry!</h1>
          <h2 style={{ color: "orange" }}>You have no items in Cart.</h2>
          <h2 style={{ color: "green" }}>Please order something</h2>
        </div>
      )}
    </>
  );
};

export default Review;
